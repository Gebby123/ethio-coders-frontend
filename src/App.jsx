import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import { useEffect, useState, createContext } from "react";
import About from "../src/pages/About";

import axios from "./pages/axiosConfig";
import Questions from "./pages/AllQuestions";

import SingleQuestion from "./pages/SingleQuestion";
import AskQuestion from "./pages/AskQuestion";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Login from "./pages/login/Login";

export const AppState = createContext();
export const QuestionState = createContext();

function App() {
  const [user, setuser] = useState({});
  const [question, setquestion] = useState({});
  const token = localStorage.getItem("token");
  // console.log(token)
  const navigate = useNavigate();

  //  to get and set user data
  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      // console.log(data)
      setuser(data);
    } catch (error) {
      console.log(error.response);
      navigate("/login");
    }
  }

  useEffect(() => {
    checkUser();

  }, []);
 

  return (
    <AppState.Provider value={{ user, setuser }}>
      <Header />
      <Routes>
        <Route path="/login" element={<About />} />
        <Route path="/ask" element={<AskQuestion />} />
        <Route path="/home" element={<Questions />} />
        <Route path="/question/:questionid" element={<SingleQuestion />} />
      </Routes>
      <Footer />
   
    </AppState.Provider>
  );
}

export default App;
