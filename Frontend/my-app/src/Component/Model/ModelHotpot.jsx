import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Empty, Select, Grid } from "antd";
import { changeModel } from "../../Features/Model/ModelSlice";

const { useBreakpoint } = Grid;
const { Option } = Select;

export default function ModelHotspot(prop) {
  const { modelList } = prop;
  const { currModel } = useSelector((state) => state.model);
  const screens = useBreakpoint();
  const dispatch = useDispatch();
  const handleOnchange = (e) => {
    console.log(e);
    if (e) {
      const alterModel = modelList.find((item) => {
        return item._id === e;
      });
      if (alterModel) {
        dispatch(changeModel(alterModel));
      }
    }
  };
  return (
    <>
      {currModel.hotspots.length > 0 ? (
        <>
          {screens.xs ? (
            // Hiển thị dropdown nếu là mobile
            <Select
              style={{ width: "100%", marginBottom: 16 }}
              placeholder="Chọn hotspot"
              onChange={handleOnchange}
            >
              {currModel.hotspots.map((item, index) => (
                <Option key={index} value={item.modelId}>
                  {item.info}
                </Option>
              ))}
            </Select>
          ) : (
            // Hiển thị danh sách nếu không phải mobile
            <ul>
              {currModel.hotspots.map((item, index) => (
                <li key={index}>{item.info}</li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <>
          {screens.xs ? (
            // Hiển thị dropdown nếu là mobile
            <Select
              style={{ width: "100%", marginBottom: 16 }}
              placeholder="Chọn hotspot"
              onChange={(value) => {
                console.log("Selected hotspot:", value);
              }}
            ></Select>
          ) : (
            <Empty
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100%",
              }}
              description="The hotspots list is empty!"
            />
          )}
        </>
      )}
    </>
  );
}
