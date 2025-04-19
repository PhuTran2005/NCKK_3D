import "./Model.scss";

import ModelViewerComponent from "../../Component/Model";
import ModelHotspot from "../../Component/Model/ModelHotpot";
import ModelAll from "../../Component/Model/ModelAll";
import React, { useEffect, useState } from "react";
import { getModelList } from "../../Service";

export default function Model() {
  const [modelList, setmodelList] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      const newData = await getModelList();
      console.log(newData);
      setmodelList(newData);
    };
    fetchAPI();
  }, []);

  return (
    <>
      <div className="model">
        <div className="model__left">
          <ModelHotspot />
        </div>
        <div className="model__main">
          <ModelViewerComponent />
        </div>
        <div className="model__right">
          <ModelAll modelList={modelList} />
        </div>
      </div>
    </>
  );
}
