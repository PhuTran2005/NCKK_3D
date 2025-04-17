import { useSelector } from "react-redux";
import React from "react";
export default function ModelHotspot() {
  const model = useSelector((state) => state.ModelReducer);

  return (
    <>
      <h1>Hotspots</h1>
      {model.hotspots.length > 0 ? (
        <ul>
          {model.hotspots.map((item, index) => (
            <li key={index}>{item.info}</li>
          ))}
        </ul>
      ) : (
        "Danh sách rỗng"
      )}
    </>
  );
}
