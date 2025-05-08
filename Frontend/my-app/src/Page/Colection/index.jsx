import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Space,
  Button,
  Card,
  Row,
  Col,
  Empty,
  Spin,
  Modal,
  Statistic,
} from "antd";
import { getTrainingResult } from "../../Service/trainingResults";
import { getCookie } from "../../helper/cookies";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  CalendarOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import "./Colection.scss";
import { getAssignment } from "../../Service/AsigmentService";

export default function Colection() {
  const [loading, setLoading] = useState(true);
  const [historyData, setHistoryData] = useState([]);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedAttempt, setSelectedAttempt] = useState(null);
  const [allQuizzes, setAllQuizzes] = useState([]);
  const userId = getCookie("id");

  useEffect(() => {
    fetchHistoryData();
  }, []);

  const fetchHistoryData = async () => {
    try {
      setLoading(true);

      const quizzes = await getAssignment();
      setAllQuizzes(quizzes);

      const response = await getTrainingResult();
      const userResults = response.filter((item) => item.account_id === userId);

      const processedData = userResults
        .map((item, index) => {
          // Tạo một bản đồ các câu hỏi từ dữ liệu quizzes
          const quizMap = {};
          quizzes.forEach((quiz) => {
            quizMap[quiz._id] = quiz;
          });

          // Xử lý chi tiết cho mỗi câu trả lời
          const answersWithDetails = item.answers.map((answer, answerIndex) => {
            const quiz = quizMap[answer.quizId];
            const isCorrect = quiz && quiz.correct_answer === answer.answer;

            return {
              ...answer,
              isCorrect: isCorrect,
              correct_answer: quiz ? quiz.correct_answer : "N/A",
              question: quiz ? quiz.question : "N/A",
              answers: quiz ? quiz.answers : [],
              originalIndex: answerIndex, // Lưu vị trí ban đầu
            };
          });

          // Tính số câu đúng và tổng số câu
          let totalQuestions = answersWithDetails.length;
          let correctAnswers = answersWithDetails.filter(
            (ans) => ans.isCorrect
          ).length;

          const timestamp = new Date(item.time || Date.now());

          return {
            key: index,
            id: item._id || index,
            examName: `Bài kiểm tra ${index + 1}`,
            date: timestamp.toLocaleDateString("vi-VN"),
            timestamp: timestamp,
            fullTimestamp: `${timestamp.toLocaleDateString(
              "vi-VN"
            )} ${timestamp.toLocaleTimeString("vi-VN")}`,
            score: item.score,
            totalQuestions: totalQuestions,
            correctAnswers: correctAnswers,
            timeSpent: "N/A",
            answers: answersWithDetails,
            rawData: item,
          };
        })
        .sort((a, b) => b.timestamp - a.timestamp);

      setHistoryData(processedData);
    } catch (error) {
      console.error("Failed to fetch history data:", error);
    } finally {
      setLoading(false);
    }
  };

  const showDetailModal = (record) => {
    setSelectedAttempt(record);
    setDetailModalVisible(true);
  };

  const handleDetailModalClose = () => {
    setDetailModalVisible(false);
  };

  const getScoreColor = (score) => {
    if (score >= 8) return "success";
    if (score >= 5) return "warning";
    return "error";
  };

  const getAnswerStatusColor = (isCorrect) => {
    return isCorrect ? "success" : "error";
  };

  // Hàm biểu thị đáp án của người dùng dưới dạng A, B, C, D
  const getLetterFromAnswer = (answer, answers) => {
    if (!answer || !answers || answers.length === 0) return "Không trả lời";
    const index = answers.findIndex((ans) => ans === answer);
    if (index === -1) return answer; // Trả về giá trị gốc nếu không tìm thấy
    return ["A", "B", "C", "D"][index];
  };

  // Tương tự cho đáp án đúng
  const getLetterFromCorrectAnswer = (correctAnswer, answers) => {
    if (!correctAnswer || !answers || answers.length === 0) return "N/A";
    const index = answers.findIndex((ans) => ans === correctAnswer);
    if (index === -1) return correctAnswer;
    return ["A", "B", "C", "D"][index];
  };

  const columns = [
    {
      title: "Đề bài",
      dataIndex: "examName",
      key: "examName",
    },
    {
      title: "Ngày làm bài",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => a.timestamp - b.timestamp,
    },
    {
      title: "Điểm số",
      dataIndex: "score",
      key: "score",
      render: (score) => (
        <Tag color={getScoreColor(score)} className="score-tag">
          {score}/10
        </Tag>
      ),
      sorter: (a, b) => a.score - b.score,
    },
    {
      title: "Số câu đúng",
      dataIndex: "correctAnswers",
      key: "correctAnswers",
      render: (correctAnswers, record) =>
        `${correctAnswers}/${record.totalQuestions}`,
    },
    {
      title: "Thời gian nộp bài",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (timestamp) => timestamp.toLocaleTimeString("vi-VN"),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showDetailModal(record)}>
            Xem chi tiết
          </Button>
        </Space>
      ),
    },
  ];

  const getChartData = () => {
    return historyData
      .slice(0, 10)
      .map((item) => ({
        name: item.fullTimestamp, // Using full timestamp instead of just date
        score: item.score,
      }))
      .reverse();
  };

  // Custom tooltip formatter for the chart
  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-time">{`Thời gian: ${label}`}</p>
          <p className="tooltip-score">{`Điểm số: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const calculateStats = () => {
    if (historyData.length === 0) return { avg: 0, highest: 0, total: 0 };

    const scores = historyData.map((item) => item.score);
    return {
      avg: (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2),
      highest: Math.max(...scores),
      total: historyData.length,
    };
  };

  const stats = calculateStats();

  return (
    <div className="collection-container">
      <div className="collection-header">
        <h1>Lịch sử làm bài</h1>
        <p>Xem lại kết quả các bài thi đã hoàn thành</p>
      </div>

      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : (
        <>
          {historyData.length > 0 ? (
            <>
              <Row gutter={[16, 16]} className="stats-row">
                <Col xs={24} sm={8}>
                  <Card>
                    <Statistic
                      title="Điểm trung bình"
                      value={stats.avg}
                      precision={1}
                      suffix="/10"
                      prefix={<TrophyOutlined />}
                      valueStyle={{ color: "#1db8e7" }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card>
                    <Statistic
                      title="Điểm cao nhất"
                      value={stats.highest}
                      suffix="/10"
                      prefix={<TrophyOutlined />}
                      valueStyle={{ color: "#3f8600" }}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card>
                    <Statistic
                      title="Tổng số bài đã làm"
                      value={stats.total}
                      prefix={<FileTextOutlined />}
                    />
                  </Card>
                </Col>
              </Row>

              {historyData.length >= 2 && (
                <Card className="chart-card">
                  <h3>Tiến độ học tập</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={getChartData()}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        interval={0}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis domain={[0, 10]} />
                      <Tooltip content={customTooltip} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#1db8e7"
                        activeDot={{ r: 8 }}
                        name="Điểm số"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              )}

              <Card className="table-card">
                <Table
                  columns={columns}
                  dataSource={historyData}
                  rowClassName="history-row"
                  pagination={{ pageSize: 10 }}
                />
              </Card>
            </>
          ) : (
            <Empty
              description="Bạn chưa hoàn thành bất kỳ bài kiểm tra nào"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              className="empty-data"
            >
              <Button type="primary" href="/assignment">
                Làm bài ngay
              </Button>
            </Empty>
          )}
        </>
      )}

      <Modal
        title={`Chi tiết bài làm - ${selectedAttempt?.examName}`}
        open={detailModalVisible}
        onCancel={handleDetailModalClose}
        footer={null}
        width={700}
        className="detail-modal"
      >
        {selectedAttempt ? (
          <div className="attempt-detail">
            <div className="attempt-info">
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div className="info-item">
                    <CalendarOutlined /> Ngày làm bài:{" "}
                    <strong>{selectedAttempt.date}</strong>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="info-item">
                    <ClockCircleOutlined /> Thời gian nộp bài:{" "}
                    <strong>
                      {selectedAttempt.timestamp.toLocaleTimeString("vi-VN")}
                    </strong>
                  </div>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div className="info-item">
                    <TrophyOutlined /> Điểm số:{" "}
                    <strong
                      className={`score-${getScoreColor(
                        selectedAttempt.score
                      )}`}
                    >
                      {selectedAttempt.score}/10
                    </strong>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="info-item">
                    <FileTextOutlined /> Số câu đúng:{" "}
                    <strong>
                      {selectedAttempt.correctAnswers}/
                      {selectedAttempt.totalQuestions}
                    </strong>
                  </div>
                </Col>
              </Row>
            </div>

            <div className="result-summary">
              <h3>Kết quả làm bài</h3>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${
                      (selectedAttempt.correctAnswers /
                        selectedAttempt.totalQuestions) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <div className="progress-labels">
                <span>0%</span>
                <span>
                  Tỷ lệ đúng:{" "}
                  {(
                    (selectedAttempt.correctAnswers /
                      selectedAttempt.totalQuestions) *
                    100
                  ).toFixed(1)}
                  %
                </span>
                <span>100%</span>
              </div>
            </div>

            {selectedAttempt.answers?.length > 0 ? (
              <div className="answer-details">
                <h3>Chi tiết câu trả lời</h3>
                {selectedAttempt.answers
                  // Sắp xếp câu hỏi theo thứ tự gốc
                  .sort((a, b) => a.originalIndex - b.originalIndex)
                  .map((answer, index) => (
                    <div key={index} className="answer-item">
                      <div className="question-number">Câu {index + 1}</div>
                      <div className="answer-content">
                        <div className="question-text">
                          {answer.question !== "N/A"
                            ? answer.question
                            : "Không có thông tin câu hỏi"}
                        </div>

                        <div className="answer-options">
                          {answer.answers && answer.answers.length > 0 && (
                            <div className="options-grid">
                              {answer.answers.map((option, optIndex) => (
                                <div
                                  key={optIndex}
                                  className={`answer-option ${
                                    answer.answer === option
                                      ? answer.isCorrect
                                        ? "selected-correct"
                                        : "selected-incorrect"
                                      : option === answer.correct_answer
                                      ? "correct-answer"
                                      : ""
                                  }`}
                                >
                                  <span className="option-letter">
                                    {["A", "B", "C", "D"][optIndex]}
                                  </span>
                                  <span className="option-text">{option}</span>
                                  {option === answer.correct_answer && (
                                    <CheckCircleOutlined className="correct-icon" />
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="answer-result">
                          {answer.answer ? (
                            <>
                              <div>
                                Câu trả lời:{" "}
                                <strong>
                                  {getLetterFromAnswer(
                                    answer.answer,
                                    answer.answers
                                  )}{" "}
                                  ({answer.answer})
                                </strong>
                              </div>
                              <div>
                                Đáp án đúng:{" "}
                                <strong>
                                  {getLetterFromCorrectAnswer(
                                    answer.correct_answer,
                                    answer.answers
                                  )}{" "}
                                  ({answer.correct_answer})
                                </strong>
                              </div>
                            </>
                          ) : (
                            <div className="not-answered">
                              <QuestionCircleOutlined /> Chưa trả lời - Đáp án
                              đúng:{" "}
                              <strong>
                                {getLetterFromCorrectAnswer(
                                  answer.correct_answer,
                                  answer.answers
                                )}{" "}
                                ({answer.correct_answer})
                              </strong>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="answer-status">
                        {answer.answer ? (
                          answer.isCorrect ? (
                            <Tag color="success" icon={<CheckCircleOutlined />}>
                              Đúng
                            </Tag>
                          ) : (
                            <Tag color="error" icon={<CloseCircleOutlined />}>
                              Sai
                            </Tag>
                          )
                        ) : (
                          <Tag color="default">Chưa trả lời</Tag>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <Empty description="Không có dữ liệu chi tiết câu trả lời" />
            )}

            <div className="modal-actions">
              <Button type="primary" onClick={handleDetailModalClose}>
                Đóng
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
