import { useEffect, useState } from "react";
import "./Asigment.scss";
import { getAssignment } from "../../Service/AsigmentService";

export default function Assigment() {
  const [dataQuestionList, setDataQuestionList] = useState([]);
  const [question, setQuestion] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const handleClick = (e) => {
    setQuestion(e);
  };
  useEffect(() => {
    const fetchApi = async () => {
      const res = await getAssignment();
      setDataQuestionList(res);
      setQuestion(res[0]);
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
  const handleSubmit = () => {
    console.log(selectedAnswers);
  };
  return (
    <>
      <div className="assignment">
        <div className="assignment__option">
          <h3 className="assignment__option--title">Tuỳ chọn</h3>
          <div className="assignment__option--content">
            <h4>Câu hỏi: </h4>
            <div className="assignment__option--quiz">
              {(dataQuestionList || []).map((item, index) => (
                <>
                  <span onClick={() => handleClick(item)} key={index}>
                    {index + 1}
                  </span>
                </>
              ))}
            </div>
          </div>
          <div onClick={handleSubmit} className="assignment__submit">
            Nộp bài
          </div>
        </div>
        <div className="assignment__quiz">
          <div className="assignment__quiz--title">
            <h4>
              Câu hỏi <span></span> :
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
                  onClick={() => handleAnswers(`${question._id}`, item)}
                >
                  <span>{ans(index)}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
