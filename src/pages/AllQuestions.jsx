import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppState, QuestionState } from "../App";
import axios from "./axiosConfig";
import "./AllQuestions.css";
import { MdArrowForwardIos } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

function AllQuestions() {
  const { user } = useContext(AppState);
  const data = useContext(QuestionState);
  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/questions/get-all", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (response.status !== 200) {
          throw new Error("Network response was not ok" + response.status);
        }

        setQuestion(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError(error.message);
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
            <div className="tops ">
              <Link to={"/ask"}>
                <h2 className="AskQuestions blue">Ask Questions</h2>
              </Link>
              <div className="searchBar">
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <h3 className="rightone">Welcome: {user?.username}</h3>
            </div>

            {loading ? (
              <p className="LoadingMessage">Loading...</p>
            ) : error ? (
              <p className="ErrorMessage">Error: {error}</p>
            ) : (
              <ul className="QuestionList">
                {question[0]
                  .filter((q) =>
                    q.title.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((question) => (
                    <div className="onhover" key={question.questionid}>
                      <li className="QuestionItem">
                        <div className="QuestionInfo d-flex">
                          <div className="flex-row">
                            <CgProfile className="AvatarQ" />
                            <span className="username">
                              {question.username}
                            </span>
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
