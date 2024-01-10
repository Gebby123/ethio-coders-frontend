import React, { useState } from "react";
import axios from "./axiosConfig";
import "./AskQuestion.css";
import ArrowCircleRightTwoToneIcon from "@mui/icons-material/ArrowCircleRightTwoTone";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";

import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify"; // Import DOMPurify

function Ask() {
  const [newQuestion, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [postAlert, setPostAlerts] = useState("");
  const [errorAlert, seterrorAlerts] = useState("");
const navigate = useNavigate();
  // Utility function to strip HTML and get plain text
  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const postQuestion = async () => {
    try {
      const token = localStorage.getItem("token");
      const plainTextDescription = stripHtml(description); // Convert to plain text

      const response = await axios.post(
        "/questions/ask",
        {
          title: newQuestion,
          description: plainTextDescription, // Use the plain text description
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setPostAlerts("Question posted successfully.");
      setQuestion("");
      setDescription("");
      setTimeout(() => {
        setPostAlerts("");
         navigate("/home");
      }, 3000);
    } catch (error) {
      console.log(error);
      seterrorAlerts("An error occurred while posting the question.");
      setQuestion("");
      setDescription("");
      setTimeout(() => {
        seterrorAlerts("");
      }, 3000);
    }
  };

  return (
    <div className="container mt0p">
      <div className="row">
        <div className="tocenter col-sm-12">
          <div className="purples">
            <h1 className="askTitle">Steps To Write A Good Question.</h1>
            <h3 className="subAsk">
              <ArrowCircleRightTwoToneIcon className="topurpel" />
              Summarize your problems in a one-line-title.
            </h3>
            <h3 className="subAsk">
              <ArrowCircleRightTwoToneIcon className="topurpel" />
              Describe your problem in more detail.
            </h3>
            <h3 className="subAsk">
              <ArrowCircleRightTwoToneIcon className="topurpel" />
              Review your question and post it here.
            </h3>
            <h1 className="to">Post Your Question Here</h1>
          </div>
          {postAlert && <div className="Alert">{postAlert}</div>}
          {errorAlert && <div className="Alert">{errorAlert}</div>}

          <form action="#">
            <div>
              <input
                type="text"
                placeholder="Question title"
                onChange={(e) => setQuestion(e.target.value)}
                style={{
                  width: "90%",
                  height: "50px",
                  margin: "10px",
                  padding: "10px",
                }}
              />
            </div>
            <div>
              <ReactQuill
                placeholder="Question details..."
                theme="snow"
                style={{
                  width: "100%",
                  height: "220px",
                  marginBottom: "50px",
                }}
                value={description}
                onChange={setDescription}
              />
            </div>
            <div className="postQuestion">
              <button
                onClick={postQuestion}
                className="blue"
                style={{ margin: "5px" }}
              >
                Post Question
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Ask;
