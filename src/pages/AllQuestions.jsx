import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppState, QuestionState } from "../App";
import axios from "./axiosConfig";
import "./AllQuestions.css";

import { MdArrowForwardIos } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

function AllQuestions() {
  const { user } = useContext(AppState);
  // console.log(user);

  const data = useContext(QuestionState);
  // console.log(data)
  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [searchQuery, setSearchQuery] = useState(""); // State to store
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/questions/get-all", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(response);

        if (response.status !== 200) {
          throw new Error("Network response was not ok" + response.status);
        }

        const data = response.data;
        console.log(data);
        setQuestion(data);

        // Set loading to false when data is successfully loaded
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError(error.message);

        // Set loading to false in case of an error
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  return (
    <section className="forbackGround">
      <div className="container">
        <div className="row thewhole">
          <div className="col-md-12 AllQuestions">
            <div className="">
              <div className=" tops ">
                <Link to={"/ask"}>
                  <h2 className="AskQuestions blue ">Ask Questions</h2>
                </Link>
                <h3 className="rightone ">welcome: {user?.username}</h3>
              </div>
            </div>

            {loading ? (
              <p className="LoadingMessage">Loading...</p>
            ) : error ? (
              <p className="ErrorMessage">Error: {error}</p>
            ) : (
              <ul className="QuestionList ">
                {question[0].map((question) => (
                  <div className="onhover">
                    <li key={question.questionid} className="QuestionItem">
                      <div className="QuestionInfo  d-flex">
                        <div className="flex-row">
                          <CgProfile className="AvatarQ" />
                          <span className="username">{question.username}</span>
                        </div>
                        <h3 className="QuestionTitle">
                          <Link
                            to={`/question/${question.questionid}`}
                            className="QuestionLink"
                          >
                            {question.title}

                            <MdArrowForwardIos className="ArrowIcon" />
                          </Link>
                        </h3>
                      </div>
                    </li>
                  </div>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AllQuestions;
