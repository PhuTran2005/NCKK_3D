import { useDispatch, useSelector } from "react-redux";
import "./Model.scss";
import React from "react";
import { changeModel } from "../../Features/Model/ModelSlice";
export default function ModelAll(prop) {
  const { modelList } = prop;
  const { currModel } = useSelector((state) => state.model);

  const dispatch = useDispatch();
  return (
    <>
      {modelList.length > 0 ? (
        <ul>
          {modelList.map((item, index) => (
            <li
              className={currModel.name === item.name ? "active" : ""}
              onClick={() => dispatch(changeModel(item))}
              key={index}
            >
              {item.name}
            </li>
          ))}
        </ul>
      ) : (
        "Danh sách rỗng"
      )}
    </>
  );
}
