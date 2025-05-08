import "./Model.scss";

import ModelViewerComponent from "../../Component/Model";
import ModelHotspot from "../../Component/Model/ModelHotpot";
import ModelAll from "../../Component/Model/ModelAll";
import React, { useEffect, useState } from "react";
import { getModelList } from "../../Service";
import { Button, Col, Empty, FloatButton, Modal, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { changeModel } from "../../Features/Model/ModelSlice";
import { QuestionCircleOutlined } from "@ant-design/icons";
export default function Model() {
  const [modelList, setmodelList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const { currModel } = useSelector((state) => state.model);
  const [choosenModel, setChoosenModel] = useState(
    modelList.length > 0 ? modelList[0] : currModel
  );

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAPI = async () => {
      const newData = await getModelList();
      setmodelList(newData);
      if (newData.length > 0) {
        setChoosenModel(newData[0]);
      }
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    if (modelList.length > 0) {
      dispatch(changeModel(modelList[0]));
    }
  }, [modelList]);
  const handleOnclick = (item) => {
    setChoosenModel(item);
  };
  const handleOK = () => {
    dispatch(changeModel(choosenModel));
    console.log(choosenModel);
    setOpen(false);
  };
  const handleOpenModel = () => {
    setOpen(true);
  };
  return (
    <>
      <Row className="model">
        <Col span={4} xs={24} lg={4} className="model__left">
          <ModelHotspot modelList={modelList} />
        </Col>
        <Col span={14} xs={24} lg={14} className="model__main">
          <ModelViewerComponent modelList={modelList} />
        </Col>

        <Col span={6} xs={24} lg={6} className="model__right">
          <ModelAll modelList={modelList} isMobile={false} />
        </Col>
        <Modal
          style={{ height: "700px" }}
          className="mobileModel"
          open={open}
          onCancel={() => setOpen(false)}
          onOk={handleOK}
        >
          {modelList.length > 0 ? (
            <div
              style={{
                padding: "1rem",
                height: "70vh",
                overflow: "hidden",
                overflowY: "auto",
              }}
            >
              {modelList.map((item, index) => {
                const isSelected = choosenModel.name === item.name;
                return (
                  <div
                    key={index}
                    onClick={() => handleOnclick(item)}
                    style={{
                      marginBottom: "16px",
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: isSelected
                        ? "0 0 10px #1890ff"
                        : "0 4px 12px rgba(0,0,0,0.1)",
                      border: isSelected ? "2px solid #1890ff" : "none",
                      transition: "all 0.3s",
                      backgroundColor: "#fff",
                      overflowY: "auto",
                    }}
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "160px",
                        objectFit: "cover",
                      }}
                    />
                    <div style={{ padding: "12px", textAlign: "center" }}>
                      <span
                        style={{
                          fontWeight: "600",
                          fontSize: "16px",
                          color: isSelected ? "#1890ff" : "#333",
                        }}
                      >
                        {item.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
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
        </Modal>
      </Row>
      <Button
        type="primary"
        className="choose__btn"
        style={{
          position: "fixed",
          bottom: "50px",
          right: "10px",
          borderRadius: "50%",
          height: "50px",
          width: "50px",
        }}
        onClick={handleOpenModel}
      >
        model
      </Button>
    </>
  );
}
