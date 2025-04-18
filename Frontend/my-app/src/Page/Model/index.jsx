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
  // const data = [
  //   {
  //     name: "Ram",
  //     pathModel:
  //       "https://firebasestorage.googleapis.com/v0/b/chay-tam-an.appspot.com/o/Gram.glb?alt=media&token=f5e8c572-c34d-48f2-8158-4211587cb625",
  //     description:
  //       "RAM (Random Access Memory) là bộ nhớ chính trong máy tính, đảm nhiệm vai trò lưu trữ tạm thời dữ liệu và chương trình đang hoạt động, cho phép CPU truy cập và xử lý một cách nhanh chóng. Không giống như bộ nhớ lưu trữ dài hạn (như ổ cứng), RAM chỉ duy trì dữ liệu trong thời gian hệ thống hoạt động và sẽ mất toàn bộ nội dung khi tắt nguồn.",
  //     thumbnail:
  //       "https://m.media-amazon.com/images/I/61XmhmEup8L._AC_SL1000_.jpg",
  //     hotspots: [],
  //   },
  //   {
  //     name: "CPU",
  //     path: "https://firebasestorage.googleapis.com/v0/b/chay-tam-an.appspot.com/o/CPU_usdz.glb?alt=media&token=81fbe14c-d0bf-4c9b-a896-80804b80d244",
  //     description:
  //       "RAM (Random Access Memory) là bộ nhớ chính trong máy tính, đảm nhiệm vai trò lưu trữ tạm thời dữ liệu và chương trình đang hoạt động, cho phép CPU truy cập và xử lý một cách nhanh chóng. Không giống như bộ nhớ lưu trữ dài hạn (như ổ cứng), RAM chỉ duy trì dữ liệu trong thời gian hệ thống hoạt động và sẽ mất toàn bộ nội dung khi tắt nguồn.",
  //     thumbnail:
  //       "https://m.media-amazon.com/images/I/61XmhmEup8L._AC_SL1000_.jpg",
  //     hotspots: [
  //       {
  //         slot: "hotspot-2",
  //         x: "-0.15m",
  //         y: "0.2m",
  //         z: "0m",
  //         info: "RAM",
  //         img: "https://m.media-amazon.com/images/I/61XmhmEup8L._AC_SL1000_.jpg",
  //       },
  //       {
  //         slot: "hotspot-3",
  //         x: "-0.15m",
  //         y: "0.1m",
  //         z: "0m",
  //         info: "ROM",
  //         img: "https://upload.wikimedia.org/wikipedia/commons/c/cc/PokemonSilverBoard.jpg",
  //       },
  //       {
  //         slot: "hotspot-4",
  //         x: "-0.12m",
  //         y: "0.27m",
  //         z: "0m",
  //         info: "Fan",
  //         img: "https://m.media-amazon.com/images/I/61cutFkWMyL.jpg",
  //       },
  //       {
  //         slot: "hotspot-5",
  //         x: "0.015m",
  //         y: "0.15m",
  //         z: "0m",
  //         info: "Disk",
  //         img: "https://www.phucanh.vn/media/news/1108_71bqA2Ee-lL._AC_SL1500_.jpg",
  //       },
  //       {
  //         slot: "hotspot-6",
  //         x: "-0.15m",
  //         y: "0.4m",
  //         z: "0m",
  //         info: "Power",
  //         img: "https://minhancomputer.com/media/lib/15-01-2021/nguon-may-tinh-cooler-master.jpg",
  //       },
  //       {
  //         slot: "hotspot-7",
  //         x: "0m",
  //         y: "0.45m",
  //         z: "0m",
  //         info: "Case",
  //         img: "https://m.media-amazon.com/images/I/61XmhmEup8L._AC_SL1000_.jpg",
  //       },
  //       {
  //         slot: "hotspot-8",
  //         x: "0.2m",
  //         y: "0.45m",
  //         z: "0.02m",
  //         info: "USB-Host",
  //         img: "https://file.hstatic.net/1000213518/file/gia-do-cpu_da96fa02d7834e50a6acfa50cdb2bc30_grande.png",
  //       },
  //     ],
  //   },
  // ];
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
