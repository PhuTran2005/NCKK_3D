import "./Home.scss";
import Reactfrom from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedParagraph from "../../Component/Model/Animation/TextAnimatio";
import DivAnimation from "../../Component/Model/Animation/DivAnimation";

const texts = [
  "Trang web cung cấp nền tảng học tập hiện đại, tích hợp công nghệ AR/VR để minh họa cấu trúc và hoạt động của máy tính.",
  "Người học có thể tương tác trực tiếp với các mô hình 3D, quan sát quá trình truyền dữ liệu, xử lý lệnh của CPU và các thành phần khác.",
  "Tính năng chính",
  "Mô hình hóa 3D",
  "Hiển thị các thành phần như CPU, ALU, RAM, Bus, Cache.",
  "Mô phỏng chi tiết sơ đồ kiến trúc máy tính Harvard / Von Neumann.",
  "Tương tác trực quan",
  "Click để xem thông tin từng thành phần.",
  "Chế độ học tập",
  "Câu hỏi trắc nghiệm tương tác.",
];

// 👇 Component riêng cho từng đoạn p có hiệu ứng scroll

export default function Home() {
  return (
    <>
      <div className="homepage">
        <div className="homepage__ad">
          <div className="homepage__title">
            <DivAnimation>
              <h3>Khám phá Kiến trúc Máy tính qua Công nghệ AR/VR</h3>
            </DivAnimation>
          </div>
          <div className="homepage__video"></div>
        </div>

        <div className="homepage__desc">
          {texts.map((text, index) => (
            <AnimatedParagraph key={index} text={text} />
          ))}
        </div>
      </div>
    </>
  );
}
