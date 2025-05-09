import "./Model.scss";

import ModelViewerComponent from "../../Component/Model";
import ModelHotspot from "../../Component/Model/ModelHotpot";
import ModelAll from "../../Component/Model/ModelAll";
import React, { useEffect, useState } from "react";
import { getModelList } from "../../Service";
import { Button, Col, Empty, Modal, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { changeModel } from "../../Features/Model/ModelSlice";
import { AppstoreOutlined } from "@ant-design/icons";

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
          title="Chọn mô hình"
          open={open}
          onCancel={() => setOpen(false)}
          onOk={handleOK}
          className="mobileModel"
          okText="Chọn"
          cancelText="Hủy"
          width="90%"
          style={{ maxWidth: "500px" }}
        >
          {modelList.length > 0 ? (
            <div className="model-grid">
              {modelList.map((item, index) => {
                const isSelected = choosenModel.name === item.name;
                return (
                  <div
                    key={index}
                    onClick={() => handleOnclick(item)}
                    className={`model-item ${isSelected ? "selected" : ""}`}
                  >
                    <div className="model-item__image">
                      <img src={item.thumbnail} alt={item.name} />
                    </div>
                    <div className="model-item__content">
                      <span className="model-item__name">{item.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <Empty
              description="Danh sách mô hình trống!"
              style={{
                padding: "40px 0",
              }}
            />
          )}
        </Modal>
      </Row>
      <Button
        type="primary"
        className="choose__btn"
        onClick={handleOpenModel}
        icon={<AppstoreOutlined />}
      >
        Mô hình
      </Button>
    </>
  );
}
