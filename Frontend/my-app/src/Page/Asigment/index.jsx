import { useEffect, useState } from "react";
import "./Asigment.scss";
import { getAssignment } from "../../Service/AsigmentService";
import { Col, Row, Modal, Select, message } from "antd";

export default function Assigment() {
  const [dataQuestionList, setDataQuestionList] = useState([]);
  const [question, setQuestion] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentExam, setCurrentExam] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [examList] = useState([
    { id: 1, name: "Đề số 1" },
    { id: 2, name: "Đề số 2" },
    { id: 3, name: "Đề số 3" },
  ]);

  const handleExamChange = (value) => {
    setCurrentExam(value);
    setSelectedAnswers({});
    setQuestion({});
    setShowResult(false);
  };

  const handleClick = (e) => {
    setQuestion(e);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getAssignment();
      console.log(res);
      setDataQuestionList(res);
      if (res.length > 0) {
        setQuestion(res[0]);
      }
    };
    fetchApi();
  }, []);

  const ans = (e) => {
    if (e == 0) return "A";
    else if (e == 1) return "B";
    else if (e == 2) return "C";
    return "D";
  };

  const handleAnswers = (id, e) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [id]: e,
    });
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    dataQuestionList.forEach((q) => {
      if (selectedAnswers[q._id] === q.correct_answer) {
        correctAnswers++;
      }
    });
    return (correctAnswers / dataQuestionList.length) * 10;
  };

  const handleSubmit = () => {
    const answeredCount = Object.keys(selectedAnswers).length;
    if (answeredCount < dataQuestionList.length) {
      message.warning(
        `Bạn còn ${dataQuestionList.length - answeredCount} câu chưa trả lời!`
      );
      return;
    }
    const finalScore = calculateScore();
    setScore(finalScore);
    setShowResult(true);
  };

  const isQuestionAnswered = (questionId) => {
    return selectedAnswers[questionId] !== undefined;
  };

  return (
    <>
      <Row className="assignment">
        <Col className="assignment__option" span={6} xs={24} lg={6}>
          <h3 className="assignment__option--title">Tuỳ chọn</h3>
          <div className="assignment__option--content">
            <Select
              style={{ width: "100%", marginBottom: "20px" }}
              placeholder="Chọn đề thi"
              onChange={handleExamChange}
              value={currentExam}
            >
              {examList.map((exam) => (
                <Select.Option key={exam.id} value={exam.id}>
                  {exam.name}
                </Select.Option>
              ))}
            </Select>
            <h4>Câu hỏi: </h4>
            <div className="assignment__option--quiz">
              {(dataQuestionList || []).map((item, index) => (
                <span
                  key={index}
                  onClick={() => handleClick(item)}
                  className={`${question._id === item._id ? "active" : ""} ${
                    isQuestionAnswered(item._id) ? "answered" : ""
                  }`}
                >
                  {index + 1}
                </span>
              ))}
            </div>
          </div>
          <div onClick={handleSubmit} className="assignment__submit">
            Nộp bài
          </div>
        </Col>

        <Col className="assignment__quiz" span={18} xs={24} lg={18}>
          <div className="assignment__quiz--title">
            <h4>
              Câu hỏi {dataQuestionList.indexOf(question) + 1} /{" "}
              {dataQuestionList.length}
            </h4>
          </div>
          <div className="assignment__quiz--content">
            <div className="assignment__quiz--question">
              {question.question}
            </div>
            <div className="assignment__quiz--answers">
              {(question.answers || []).map((item, index) => (
                <div
                  className={`assignment__quiz--list ${
                    selectedAnswers[question._id] === item ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => handleAnswers(question._id, item)}
                >
                  <span>{ans(index)}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>

      <Modal
        title="Kết quả bài thi"
        open={showResult}
        onCancel={() => setShowResult(false)}
        footer={null}
        className="result-modal"
      >
        <div className="result-modal__content">
          <div className="result-modal__score">
            Điểm số: {score.toFixed(2)}/10
          </div>
          <div className="result-modal__details">
            <p>
              Số câu đúng: {Math.round((score / 10) * dataQuestionList.length)}/
              {dataQuestionList.length}
            </p>
            <p>Tỷ lệ đúng: {((score / 10) * 100).toFixed(1)}%</p>
          </div>
        </div>
      </Modal>
    </>
  );
}
