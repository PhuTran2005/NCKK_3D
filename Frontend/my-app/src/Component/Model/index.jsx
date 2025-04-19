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
  const handleModelChange = () => {};
  const handleHotspotClick = (event) => {
    event.stopPropagation();

    const target = event.target;
    setTooltipData({
      img: target.getAttribute("data-img"),
      text: target.getAttribute("data-info"),
      visible: true,
      x: target.getBoundingClientRect().left + window.scrollX + 20,
      y: target.getBoundingClientRect().top + window.scrollY - 30,
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
        style={{ width: "100%", height: "500px" }}
      >
        {/* Hotspots will be dynamically added here */}
      </model-viewer>

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
      <h2>{currModel.name}</h2>
      <p>{currModel.description}</p>
    </>
  );
};

export default ModelViewerComponent;
