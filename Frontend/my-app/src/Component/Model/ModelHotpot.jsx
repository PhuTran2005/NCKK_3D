import { useSelector } from "react-redux";
import React from "react";
export default function ModelHotspot() {
  const { currModel } = useSelector((state) => state.model);

  return (
    <>
      <h1>Hotspots</h1>
      {currModel.hotspots.length > 0 ? (
        <ul>
          {currModel.hotspots.map((item, index) => (
            <li key={index}>{item.info}</li>
          ))}
        </ul>
      ) : (
        "Danh sách rỗng"
      )}
    </>
  );
}
