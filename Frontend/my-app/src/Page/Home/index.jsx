import "./Home.scss";
import Reactfrom from "react";
import { UserOutlined } from "@ant-design/icons";
import cpu from "../../assets/Images/cpu.png";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedParagraph from "../../Component/Model/Animation/TextAnimatio";
import DivAnimation from "../../Component/Model/Animation/DivAnimation";
import { Avatar, Col, Row } from "antd";
// 👇 Component riêng cho từng đoạn p có hiệu ứng scroll
const intitTeam = [
  {
    name: "Cao Xuân Điệp",
    mssv: "6451071019",
  },
  {
    name: "Trần Văn Phú",
    mssv: "6451071060",
  },
  {
    name: "Phan Quốc Thắng",
    mssv: "6451071073",
  },
  {
    name: "Trần Đình Võ",
    mssv: "6451071088",
  },
  {
    name: "Phạm Hải Yến",
    mssv: "6451071091",
  },
];
export default function Home() {
  return (
    <>
      <div className="homepage">
        <Row className="homepage__ad">
          <Col span={12} xs={24} sm={12} className="homepage__title">
            <DivAnimation>
              <h3>Khám phá Kiến trúc Máy tính qua Công nghệ AR/VR</h3>
            </DivAnimation>
          </Col>
          <Col span={12} xs={24} sm={12} className="homepage__video"></Col>
        </Row>

        <div className="homepage__desc"></div>
        <Row className="homepage__detail">
          <Col span={18} xs={24} sm={12}>
            <h1 className="homepage__detail__title">
              Tính cấp thiết và ứng dụng
            </h1>
            <p className="homepage__detail__desc">
              Người học có thể tương tác trực tiếp với các mô hình 3D, quan sát
              quá trình truyền dữ liệu, xử lý lệnh của CPU và các thành phần
              khác.
            </p>
          </Col>
          <Col span={6} xs={24} sm={12} className="homepage__video"></Col>
        </Row>
        <Row className="homepage__detail">
          <Col span={24} xs={24} sm={24} className="">
            <h1 className="homepage__detail__title">Nhóm thực hiện</h1>
            <p className="homepage__detail__desc">
              Đề tài nghiên cứu khoa học :
            </p>
            <p
              className="homepage__detail__desc"
              style={{ textAlign: "center", fontWeight: "bold" }}
            >
              “Ứng dụng công nghệ thực tế ảo (AR/VR) trong bài giảng Kiến trúc
              máy tính”
            </p>

            <p className="homepage__detail__desc">Thực hiện bởi: </p>
            <p
              className="homepage__detail__desc"
              style={{ textAlign: "center" }}
            >
              Nhóm sinh viên Bộ môn Công nghệ Thông tin – Trường Đại học Giao
              thông vận tải Phân hiệu tại Thành phố Hồ Chí Minh (UTC2) 2024 –
              2025
            </p>
          </Col>
        </Row>
        <div className="homepage__infor">
          {intitTeam.map((item, index) => (
            <div key={index} className="homepage__infor__avatar">
              <Avatar size={100} icon={<UserOutlined />} />
              <p>{item.name}</p>
              <p>{item.mssv}</p>
            </div>
          ))}
        </div>
        <Row>
          <Col span={8} xs={24} sm={8} style={{ textTransform: "uppercase" }}>
            <h1 style={{ fontSize: "35px" }}>Tính năng chính</h1>
          </Col>
          <Col className="homepage__func" span={16} xs={24} sm={16}>
            <div>
              <img
                style={{ height: "30px", width: "30px" }}
                src={cpu}
                alt="example"
              />
              <p>Mô hình hóa 3D CPU, ALU, RAM, Bus, Cache</p>
            </div>
            <div>
              <img
                style={{ height: "30px", width: "30px" }}
                src={cpu}
                alt="example"
              />
              <p>Mô phỏng kiến trúc máy tính Harvard / Von Neumann</p>
            </div>
            <div>
              <img
                style={{ height: "30px", width: "30px" }}
                src={cpu}
                alt="example"
              />
              <p>
                Tương tác trực quan - Click để xem thông tin từng thành phần
              </p>
            </div>
            <div>
              <img
                style={{ height: "30px", width: "30px" }}
                src={cpu}
                alt="example"
              />
              <p>Chế độ học tập - Câu hỏi trắc nghiệm, ghép hình</p>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
