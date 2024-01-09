import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "./axiosConfig";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CgProfile } from "react-icons/cg";
import DOMPurify from "dompurify"; // Import DOMPurify
import "./SingleQuestion.css";

function SingleQuestion() {
  const navigate = useNavigate();
  const { questionid } = useParams();
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const questionResponse = await axios.get(
        `/questions/question/${questionid}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setQuestion(questionResponse.data.title.toUpperCase());
      setDescription(questionResponse.data.description.toLowerCase());

      const response = await axios.get(`/answers/all-answers/${questionid}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const answersData = response.data.answers || [];
     setAnswers(answersData.reverse());
    } catch (error) {
      console.error("Error fetching question or answers:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [questionid]);

  const handlePostAnswer = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `/answers/question/${questionid}`,
        { answer: newAnswer },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.data.msg) {
        setAlertMessage("Success: " + response.data.msg);
      }

      setNewAnswer("");
      fetchData();
    } catch (error) {
      console.error("Error posting answer:", error);
    }
  };

  // Function to sanitize HTML content
  const sanitizeHTML = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  return (
    <section className="forbackGrounds">
      <div className="container">
        <div className="row thewhole">
          <div className="col-md-12 max-width">
            <h1 className="titlequestion">QUESTION</h1>
            <h4 className="question">{question}</h4>
            <span className="description">{description}</span>
            <div>
              <h1 className="answerTitle">Answers From the Community</h1>
            </div>
            <ul className="QuestionList scrollable-div">
              {answers.map((answer, index,) => (
                <li key={answer.answerid} className="AnswerItem">
                  <div className="QuestionInfo">
                    <div className="flex-row">
                      <CgProfile className="Avatar" />
                      <span className="username">{answer.username}</span>
                    </div>
                    <div
                      dangerouslySetInnerHTML={sanitizeHTML(answer.answer)}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <div className="fortopmr">
              {alertMessage && <div className="alert">{alertMessage}</div>}
              <ReactQuill
                theme="snow"
                style={{
                  width: "100%",
                  height: "220px",
                  marginBottom: "50px",
                }}
                value={newAnswer}
                onChange={(value) => setNewAnswer(value)}
                placeholder="Your answer..."
              />
              <div className="postanswer">
                <button
                  onClick={handlePostAnswer}
                  className="blue m-r"
                  style={{ margin: "10px" }}
                >
                  Post Answer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleQuestion;
