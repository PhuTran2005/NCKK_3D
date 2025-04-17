import "./Home.scss";

import ModelViewerComponent from "../../Component/Model";
import ModelHotspot from "../../Component/Model/ModelHotpot";
import ModelAll from "../../Component/Model/ModelAll";
import { useSelector } from "react-redux";
import React from "react";

export default function Home() {
  const model = useSelector((state) => state.ModelReducer);
  console.log(model);
  const data = [
    {
      name: "Ram",
      path: "https://firebasestorage.googleapis.com/v0/b/chay-tam-an.appspot.com/o/Gram.glb?alt=media&token=f5e8c572-c34d-48f2-8158-4211587cb625",
      hotspots: [],
    },
    {
      name: "CPU",
      path: "https://firebasestorage.googleapis.com/v0/b/chay-tam-an.appspot.com/o/CPU_usdz.glb?alt=media&token=81fbe14c-d0bf-4c9b-a896-80804b80d244",
      hotspots: [
        {
          slot: "hotspot-2",
          x: "-0.15m",
          y: "0.2m",
          z: "0m",
          info: "RAM",
          img: "https://m.media-amazon.com/images/I/61XmhmEup8L._AC_SL1000_.jpg",
        },
        {
          slot: "hotspot-3",
          x: "-0.15m",
          y: "0.1m",
          z: "0m",
          info: "ROM",
          img: "https://m.media-amazon.com/images/I/61XmhmEup8L._AC_SL1000_.jpg",
        },
      ],
    },
  ];
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
          <ModelAll modelList={data} />
        </div>
      </div>
    </>
  );
}
