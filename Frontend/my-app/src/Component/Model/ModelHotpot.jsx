import React from "react";
import { useSelector } from "react-redux";
import { Empty, Select, Grid } from "antd";

const { useBreakpoint } = Grid;
const { Option } = Select;

export default function ModelHotspot() {
  const { currModel } = useSelector((state) => state.model);
  const screens = useBreakpoint();
  const handleOnchange = () => {};
  return (
    <>
      {currModel.hotspots.length > 0 ? (
        <>
          {screens.xs ? (
            // Hiển thị dropdown nếu là mobile
            <Select
              style={{ width: "100%", marginBottom: 16 }}
              placeholder="Chọn hotspot"
              onChange={(value) => {
                console.log("Selected hotspot:", value);
              }}
            >
              {currModel.hotspots.map((item, index) => (
                <Option key={index} value={item.info} onChange={handleOnchange}>
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
  );
}
