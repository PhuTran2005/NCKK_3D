import { useDispatch, useSelector } from "react-redux";
import "./Model.scss";
import React from "react";
import { changeModel } from "../../Features/Model/ModelSlice";
import { Card, Empty } from "antd";
const { Meta } = Card;

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
              <Card
                hoverable
                style={{}}
                cover={
                  <img
                    style={{ height: "100px" }}
                    alt="example"
                    src={item.thumbnail}
                  />
                }
              >
                <Meta title={item.name} />
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <Empty
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100%",
          }}
          description="The models list is empty!"
        />
      )}
    </>
  );
}
