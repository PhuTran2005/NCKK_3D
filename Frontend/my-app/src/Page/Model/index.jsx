import "./Model.scss";

import ModelViewerComponent from "../../Component/Model";
import ModelHotspot from "../../Component/Model/ModelHotpot";
import ModelAll from "../../Component/Model/ModelAll";
import React, { useEffect, useState } from "react";
import { getModelList } from "../../Service";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { changeModel } from "../../Features/Model/ModelSlice";

export default function Model() {
  const [modelList, setmodelList] = useState([]);
  const { currModel } = useSelector((state) => state.model);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAPI = async () => {
      const newData = await getModelList();
      setmodelList(newData);
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    if (modelList.length > 0) {
      dispatch(changeModel(modelList[0]));
    }
  }, [modelList]);

  return (
    <>
      <Row className="model">
        <Col span={4} xs={24} lg={4} className="model__left">
          <ModelHotspot />
        </Col>
        <Col span={14} xs={24} lg={14} className="model__main">
          <ModelViewerComponent />
        </Col>
        <Col span={6} xs={24} lg={6} className="model__right">
          <ModelAll modelList={modelList} />
        </Col>
      </Row>
    </>
  );
}
