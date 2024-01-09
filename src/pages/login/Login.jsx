import React, { useContext, useRef, useState} from "react";
import axios from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import './login.css'
import { AppState } from "../../App";
function Login() {
	const { user, setuser } = useContext(AppState);
	const navigate = useNavigate();
	const emailDom = useRef(null);
	const passwordDom = useRef(null);
	const [alertMessages, setAlertMessages] = useState("");
    const [success , setSuccess]= useState("")
	 const [showPassword, setShowPassword] = useState(false);

	
	// to toggle the visibility of password
		const togglePasswordVisibility = () => {
			setShowPassword(!showPassword);
	};
	
	
    // function to handle the user login
	async function handleSubmit(e) {
		e.preventDefault();

		const emailValue = emailDom.current.value;
		const passwordValue = passwordDom.current.value;
		if (!emailValue || !passwordValue) {
			setAlertMessages("Please provide all requirs ");
			setTimeout(() => {
				setAlertMessages("");
			}, 3000);
			return;
		}
		
		try {
			const {data}=await axios.post("/users/login", {
				email: emailValue,
				password: passwordValue,
			});
			setSuccess("logged in successfuly");
			setTimeout(() => {
				setSuccess("");
			}, 3000);
			localStorage.setItem('token', data.token)
			// console.log(data);
			  setuser(data);
			navigate("/home");
		} catch (error) {
			// alert(error?.response?.data?.message);
      alert("you are not register first register and try again");
			console.log(error.response);
		}
	};
	return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="mainRegisterWrapper">
            <section className="secondRegisterWrapper">
              {alertMessages && <div className="alerts">{alertMessages}</div>}
              {success && <div className="alerts">{success}</div>}
              <form onSubmit={handleSubmit}>
                <div className="inputs">
                  <div>
                    <input type="email" ref={emailDom} placeholder="email" />
                  </div>
                  <div className="password">
                    <input
                      type={showPassword ? "text" : "password"}
                      ref={passwordDom}
                      placeholder="password"
                    />
                    <span onClick={togglePasswordVisibility}>
                      {showPassword ? (
                        <FaRegEye className="eyes" />
                      ) : (
                        <FaRegEyeSlash className="eyes" />
                      )}
                    </span>
                  </div>
                </div>

                <div>
                  <Link to="/email" className="forgetpassword">
                    Forget Password
                  </Link>
                </div>

                <button className="toblue" type="submit">
                  login
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
