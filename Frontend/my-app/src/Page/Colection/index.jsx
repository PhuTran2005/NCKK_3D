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
          let totalQuestions = 0;
          let correctAnswers = 0;

          const answersWithDetails = item.answers.map((answer) => {
            const quiz = quizzes.find((q) => q._id === answer.quizId);
            const isCorrect = quiz && quiz.correct_answer === answer.answer;

            if (quiz) {
              totalQuestions++;
              if (isCorrect) {
                correctAnswers++;
              }
            }

            return {
              ...answer,
              isCorrect: isCorrect,
              correct_answer: quiz ? quiz.correct_answer : "N/A",
              question: quiz ? quiz.question : "N/A",
            };
          });

          return {
            key: index,
            id: item._id || index,
            examName: `Bài kiểm tra ${index + 1}`,
            date: new Date(item.time || Date.now()).toLocaleDateString("vi-VN"),
            timestamp: new Date(item.time || Date.now()),
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
        name: item.date,
        score: item.score,
      }))
      .reverse();
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
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
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
                {selectedAttempt.answers.map((answer, index) => (
                  <div key={index} className="answer-item">
                    <div className="question-number">Câu {index + 1}</div>
                    <div className="answer-content">
                      <div className="question-text">
                        {answer.question !== "N/A"
                          ? answer.question
                          : "Không có thông tin câu hỏi"}
                      </div>
                      {answer.answer ? (
                        <>
                          <div>
                            Câu trả lời: <strong>{answer.answer}</strong>
                          </div>
                          <div>
                            Đáp án đúng:{" "}
                            <strong>{answer.correct_answer}</strong>
                          </div>
                        </>
                      ) : (
                        <div>Chưa trả lời</div>
                      )}
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
