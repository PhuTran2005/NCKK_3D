import { useState, useRef, useEffect } from "react";
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
  const handleModelChange = () => {
    console.log("oce");
  };
  const handleHotspotClick = (event) => {
    console.log(event.target);
    event.stopPropagation();
    console.log("yep");
    const target = event.target;

    const img = target.getAttribute("data-img");
    const text = target.getAttribute("data-info");

    // Lấy bounding box của hotspot và container
    const rect = target.getBoundingClientRect();
    const containerRect = modelViewerRef.current.getBoundingClientRect();

    // Giả sử tooltip rộng 180px, cao 120px (bạn có thể tùy chỉnh hoặc lấy từ ref)
    const TOOLTIP_W = 180;
    const TOOLTIP_H = 120;
    const MARGIN = 8;

    // Tính vị trí tương đối so với container:
    // - căn giữa ngang hotspot
    let x = rect.left - containerRect.left + rect.width / 2 - TOOLTIP_W / 2;
    // - đặt lên phía trên hotspot, cách MARGIN px
    let y = rect.top - containerRect.top - TOOLTIP_H - MARGIN;

    // Giới hạn để tooltip không tràn ra ngoài container
    x = Math.max(MARGIN, Math.min(x, containerRect.width - TOOLTIP_W - MARGIN));
    y = Math.max(MARGIN, y);

    setTooltipData({
      img,
      text,
      visible: true,
      x,
      y,
    });
  };

  const hideTooltip = () => {
    setTooltipData((prev) => ({ ...prev, visible: false }));
  };

  useEffect(() => {
    const handleClickOutside = () => {
      hideTooltip();
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [currModel]);

  useEffect(() => {
    if (
      !modelViewerRef.current ||
      !currModel ||
      !Array.isArray(currModel.hotspots)
    )
      return;

    if (modelViewerRef.current) {
      // Clear existing hotspots

      modelViewerRef.current
        .querySelectorAll(".hotspot")
        .forEach((hotspot) => hotspot.remove());

      // Create and append new hotspots
      currModel.hotspots.forEach((hotspot) => {
        const button = document.createElement("button");
        button.className = "hotspot";
        button.setAttribute("slot", hotspot.slot);
        button.dataset.info = hotspot.info;
        button.innerText = hotspot.info;
        button.setAttribute("data-img", hotspot.img);
        button.setAttribute(
          "data-position",
          `${hotspot.x} ${hotspot.y} ${hotspot.z}`
        );
        button.addEventListener("click", handleHotspotClick);
        modelViewerRef.current.appendChild(button);
      });
    }
  }, [currModel]);

  return (
    <>
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
        // style={{ width: "100%", height: "500px" }}
      ></model-viewer>

      {tooltipData.visible && (
        <button
          id="tooltip"
          className="tooltip"
          style={{
            display: tooltipData.visible ? "block" : "none",
            left: `${tooltipData.x}px`,
            top: `${tooltipData.y}px`,
            animation: "fadeBounce 0.4s ease-out forwards",
          }}
          onClick={handleModelChange}
        >
          <img id="tooltip-img" src={tooltipData.img} alt="Hotspot Image" />
          <p id="tooltip-text">{tooltipData.text}</p>
        </button>
      )}
      <div className="model__detail">
        <h2>{currModel.name}</h2>
        <p>{currModel.description}</p>
      </div>
    </>
  );
};

export default ModelViewerComponent;
