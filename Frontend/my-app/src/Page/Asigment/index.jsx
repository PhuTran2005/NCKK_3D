import { useEffect, useState } from "react";
import "./Asigment.scss";
import { getAssignment } from "../../Service/AsigmentService";
import { Col, Row, Modal, Select, message, Button, Switch } from "antd";
import { getCookie } from "../../helper/cookies";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { postTrainingResult } from "../../Service/trainingResults";

export default function Assigment() {
  const [originalQuestionList, setOriginalQuestionList] = useState([]);
  const [dataQuestionList, setDataQuestionList] = useState([]);
  const [question, setQuestion] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentExam, setCurrentExam] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [detailAnswer, setDetailAnswer] = useState(false);
  const [answerDetail, setAnswerDetail] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shuffleQuestions, setShuffleQuestions] = useState(false);
  const [submittedQuestionOrder, setSubmittedQuestionOrder] = useState([]);
  const [examList] = useState([
    { id: 1, name: "Đề số 1" },
    { id: 2, name: "Đề số 2" },
    { id: 3, name: "Đề số 3" },
  ]);
  const userId = getCookie("id");

  const handleExamChange = (value) => {
    setCurrentExam(value);
    setSelectedAnswers({});
    resetQuestions();
    setShowResult(false);
    setDetailAnswer(false);
    setSubmittedQuestionOrder([]);
  };

  const handleShuffleChange = (checked) => {
    setShuffleQuestions(checked);
    resetQuestions(checked);
  };

  // Hàm để trộn ngẫu nhiên mảng
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Hàm đặt lại câu hỏi, có thể trộn nếu cần
  const resetQuestions = (shouldShuffle = shuffleQuestions) => {
    if (shouldShuffle && originalQuestionList.length > 0) {
      const shuffled = shuffleArray(originalQuestionList);
      setDataQuestionList(shuffled);
      setQuestion(shuffled[0]);
    } else if (originalQuestionList.length > 0) {
      setDataQuestionList([...originalQuestionList]);
      setQuestion(originalQuestionList[0]);
    }
  };

  const handleClick = (e) => {
    setQuestion(e);
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getAssignment();
        console.log(res);
        setOriginalQuestionList(res);
        setDataQuestionList(shuffleQuestions ? shuffleArray(res) : res);
        if (res.length > 0) {
          setQuestion(res[0]);
        }
      } catch (error) {
        console.error("Failed to fetch assignments:", error);
        message.error("Không thể tải câu hỏi. Vui lòng thử lại sau.");
      }
    };
    fetchApi();
  }, []);

  const ans = (e) => {
    return ["A", "B", "C", "D"][e];
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

  const handleReset = () => {
    setDetailAnswer(false);
    setSelectedAnswers({});
    setSubmittedQuestionOrder([]);
    resetQuestions();
  };

  const handleDetail = () => {
    setShowResult(false);
    setDetailAnswer(true);
  };

  const handleCloseResultModal = () => {
    setShowResult(false);
    // When closing the result modal without viewing details,
    // restore the question order from submission time
    if (submittedQuestionOrder.length > 0) {
      setDataQuestionList([...submittedQuestionOrder]);
      setQuestion(submittedQuestionOrder[0]);
    }
  };

  const submitQuiz = async (option) => {
    console.log(option);
    try {
      setIsSubmitting(true);
      // Save the current question order at submission time
      setSubmittedQuestionOrder([...dataQuestionList]);

      const result = await postTrainingResult(option);
      console.log(result);

      const finalScore = calculateScore();
      setScore(finalScore);
      setShowResult(true);

      setIsSubmitting(false);

      // We no longer reset here to preserve the question order
      // handleReset() is only called when explicitly requested

      return true;
    } catch (error) {
      console.error("Failed to submit quiz:", error);
      message.error("Có lỗi xảy ra khi nộp bài. Vui lòng thử lại.");
      setIsSubmitting(false);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    console.log(selectedAnswers);
    const option = {
      account_id: userId,
      answers: dataQuestionList.map((item) => {
        return {
          quizId: item._id,
          answer:
            selectedAnswers[item._id] !== undefined
              ? selectedAnswers[item._id]
              : null,
        };
      }),
      score: calculateScore(),
    };

    console.log(option);
    setAnswerDetail(option.answers);
    const quantityNoAns =
      dataQuestionList.length - Object.keys(selectedAnswers).length;

    if (quantityNoAns > 0) {
      Swal.fire({
        title: "Bạn chắc chắn nộp chứ",
        text: `Bạn còn ${quantityNoAns} câu chưa hoàn thành`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Vâng!",
        cancelButtonText: "Không, Tôi cần hoàn thành nó!",
      }).then((result) => {
        if (result.isConfirmed) {
          submitQuiz(option);
        }
      });
    } else {
      submitQuiz(option);
    }
  };

  const isQuestionAnswered = (questionId) => {
    return selectedAnswers[questionId] !== undefined;
  };

  const isTrueOrFalse = (index) => {
    if (!answerDetail || index < 0 || index >= dataQuestionList.length) {
      return false;
    }
    const answer = answerDetail[index]?.answer;
    return answer === dataQuestionList[index].correct_answer;
  };

  const isAnswerCorrect = (questionId, answer) => {
    const question = dataQuestionList.find((q) => q._id === questionId);
    return question && answer === question.correct_answer;
  };

  const getAnswerClass = (questionId, answer) => {
    if (!detailAnswer) {
      return selectedAnswers[questionId] === answer ? "selected" : "";
    }

    const question = dataQuestionList.find((q) => q._id === questionId);
    if (!question) return "";

    if (answer === question.correct_answer) {
      return "correct";
    } else if (selectedAnswers[questionId] === answer) {
      return "incorrect";
    }
    return "";
  };

  const handleShuffleQuestions = () => {
    if (originalQuestionList.length > 0) {
      const shuffled = shuffleArray(originalQuestionList);
      setDataQuestionList(shuffled);
      setQuestion(shuffled[0]);
      setSelectedAnswers({});
      setSubmittedQuestionOrder([]);
    }
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
              disabled={detailAnswer || showResult}
            >
              {examList.map((exam) => (
                <Select.Option key={exam.id} value={exam.id}>
                  {exam.name}
                </Select.Option>
              ))}
            </Select>

            <div className="assignment__option--shuffle">
              <span>Trộn câu hỏi:</span>
              <Switch
                checked={shuffleQuestions}
                onChange={handleShuffleChange}
                disabled={
                  detailAnswer ||
                  showResult ||
                  submittedQuestionOrder.length > 0
                }
              />
            </div>

            {shuffleQuestions &&
              !detailAnswer &&
              !showResult &&
              submittedQuestionOrder.length === 0 && (
                <Button
                  type="primary"
                  onClick={handleShuffleQuestions}
                  style={{ width: "100%", marginBottom: "20px" }}
                >
                  Trộn lại câu hỏi
                </Button>
              )}

            <h4>Câu hỏi: </h4>
            <div className="assignment__option--quiz">
              {dataQuestionList.map((item, index) => (
                <span
                  key={index}
                  onClick={() => handleClick(item)}
                  className={`
                    ${question._id === item._id ? "active" : ""}
                    ${
                      detailAnswer
                        ? isTrueOrFalse(index)
                          ? "true"
                          : "false"
                        : isQuestionAnswered(item._id)
                        ? "answered"
                        : ""
                    }
                    ${
                      showResult ||
                      detailAnswer ||
                      submittedQuestionOrder.length > 0
                        ? "submitted"
                        : ""
                    }
                  `}
                >
                  {index + 1}
                </span>
              ))}
            </div>
          </div>
          <div className="assignment__btn">
            {detailAnswer ? (
              <div onClick={handleReset} className="assignment__reset">
                Làm lại
              </div>
            ) : submittedQuestionOrder.length > 0 ? (
              <div className="assignment__btn-group">
                <div onClick={handleDetail} className="assignment__detail-btn">
                  Xem chi tiết
                </div>
                <div onClick={handleReset} className="assignment__reset">
                  Làm lại
                </div>
              </div>
            ) : (
              <div
                onClick={handleSubmit}
                className={`assignment__submit ${
                  isSubmitting ? "submitting" : ""
                }`}
                style={{
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                }}
              >
                {isSubmitting ? "Đang nộp..." : "Nộp bài"}
              </div>
            )}
          </div>
        </Col>

        <Col className="assignment__quiz" span={18} xs={24} lg={18}>
          <div className="assignment__quiz--title">
            <h4>
              Câu hỏi {dataQuestionList.indexOf(question) + 1}/
              {dataQuestionList.length}
            </h4>
            {(showResult || submittedQuestionOrder.length > 0) &&
              !detailAnswer && (
                <div className="assignment__quiz--submitted-tag">Đã nộp</div>
              )}
          </div>
          <div className="assignment__quiz--content">
            <div className="assignment__quiz--question">
              <span>{question.question}</span>
              {detailAnswer && (
                <span className="assignment__quiz--question-detail">
                  {isTrueOrFalse(dataQuestionList.indexOf(question)) ? (
                    <span className="detail-true">Đúng</span>
                  ) : (
                    <span className="detail-false">Sai</span>
                  )}
                </span>
              )}
            </div>
            <div className="assignment__quiz--answers">
              {(question.answers || []).map((item, index) => (
                <div
                  className={`assignment__quiz--list ${getAnswerClass(
                    question._id,
                    item
                  )} ${
                    (showResult || submittedQuestionOrder.length > 0) &&
                    !detailAnswer
                      ? "disabled"
                      : ""
                  }`}
                  key={index}
                  onClick={() =>
                    !detailAnswer &&
                    !showResult &&
                    submittedQuestionOrder.length === 0 &&
                    handleAnswers(question._id, item)
                  }
                >
                  <span>{ans(index)}</span>
                  <span>{item}</span>
                  {detailAnswer && item === question.correct_answer && (
                    <span className="correct-answer-icon">✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>

      <Modal
        title="Kết quả bài thi"
        open={showResult}
        onCancel={handleCloseResultModal}
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
          <div onClick={handleDetail} className="assignment__detail">
            Xem chi tiết
          </div>
        </div>
      </Modal>
    </>
  );
}
