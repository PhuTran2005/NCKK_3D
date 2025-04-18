import { useState, useRef, useEffect, useCallback } from "react";
import "@google/model-viewer";
import "./Model.scss";
import { useSelector } from "react-redux";
import React from "react";

const ModelViewerComponent = () => {
  const { currModel } = useSelector((state) => state.model);
  const [tooltipData, setTooltipData] = useState({
    img: "",
    text: "",
    visible: false,
    x: 0,
    y: 0,
  });

  const modelViewerRef = useRef(null);

  const handleHotspotClick = useCallback((event) => {
    event.stopPropagation();
    const target = event.target;

    setTooltipData({
      img: target.getAttribute("data-img"),
      text: target.getAttribute("data-info"),
      visible: true,
      x: target.getBoundingClientRect().left + window.scrollX + 20,
      y: target.getBoundingClientRect().top + window.scrollY - 30,
    });
  }, []);

  const hideTooltip = () => {
    setTooltipData((prev) => ({ ...prev, visible: false }));
  };

  // Click outside để ẩn tooltip
  useEffect(() => {
    const handleClickOutside = () => hideTooltip();
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Xử lý tạo lại các hotspots khi currModel.hotspots thay đổi
  useEffect(() => {
    const viewer = modelViewerRef.current;
    if (!viewer || !currModel?.hotspots) return;

    // Xóa hotspot cũ
    viewer.querySelectorAll(".hotspot").forEach((hotspot) => {
      hotspot.removeEventListener("click", handleHotspotClick);
      hotspot.remove();
    });

    // Tạo hotspot mới
    currModel.hotspots.forEach((hotspot) => {
      const button = document.createElement("button");
      button.className = "hotspot";
      button.setAttribute("slot", hotspot.slot);
      button.setAttribute("data-img", hotspot.img);
      button.setAttribute("data-info", hotspot.info);
      button.innerText = hotspot.info;
      button.setAttribute(
        "data-position",
        `${hotspot.x} ${hotspot.y} ${hotspot.z}`
      );
      button.addEventListener("click", handleHotspotClick);
      viewer.appendChild(button);
    });

    return () => {
      viewer.querySelectorAll(".hotspot").forEach((hotspot) => {
        hotspot.removeEventListener("click", handleHotspotClick);
        hotspot.remove();
      });
    };
  }, [currModel?.hotspots, handleHotspotClick]);

  return (
    <>
      {currModel?.linkFile && (
        <model-viewer
          ref={modelViewerRef}
          id="modelViewer"
          src={currModel.linkFile}
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          auto-rotate
          shadow-intensity="1"
          interaction-prompt="none"
          exposure="1"
          style={{ width: "100%", height: "500px" }}
        />
      )}

      {tooltipData.visible && (
        <button
          id="tooltip"
          className="tooltip"
          style={{
            left: `${tooltipData.x}px`,
            top: `${tooltipData.y}px`,
            animation: "fadeBounce 0.4s ease-out forwards",
          }}
        >
          <img id="tooltip-img" src={tooltipData.img} alt="Hotspot" />
          <p id="tooltip-text">{tooltipData.text}</p>
        </button>
      )}
    </>
  );
};

export default ModelViewerComponent;
