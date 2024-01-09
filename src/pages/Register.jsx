import React, { useContext, useRef, useState } from "react";
import axios from "./axiosConfig";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { AppState } from "../App";

function Register() {
	const { user, setuser } = useContext(AppState);
	const navigate = useNavigate();
	const userNameDom = useRef(null);
	const firstNameDom = useRef(null);
	const lastNameDom = useRef(null);
	const emailDom = useRef(null);
	const passwordDom = useRef(null);
	const [alert, setalert] = useState("");
	const [error, seterror] = useState("");
	const [createdMessage, setCreatedMessage] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [errorCatch, setCatch]= useState("")

	// to toggle the visibility of password
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};


	// function to handle the user registretion
	async function handleSubmit(e) {
		e.preventDefault();
		// console.log(userNameDom.current.value);
		const userNameValue = userNameDom.current.value;
		const firsNameValue = firstNameDom.current.value;
		const lastNameValue = lastNameDom.current.value;
		const emailValue = emailDom.current.value;
		const passwordValue = passwordDom.current.value;

		// to check if all values are provided
		if (
			!userNameValue ||
			!firsNameValue ||
			!lastNameValue ||
			!emailValue ||
			!passwordValue
		) {
			setalert("Please provide all required information ");
			setTimeout(() => {
				setalert("");
			}, 3000);
			return;
		}

		//  posting the user data to the database
		try {
			const { data } = await axios.post("/users/register", {
				username: userNameValue,
				firstname: firsNameValue,
				lastname: lastNameValue,
				email: emailValue,
				password: passwordValue,
			});
			console.log(data.username);
			console.log(data)
			setuser(data);
		
			setCreatedMessage("user registered");
			setTimeout(() => {
				setCreatedMessage("");
			},3000);

			// setting the user's token on localStorage
			localStorage.setItem("token", data.token);

			navigate("/home");

			// to handle any error
		} catch (error) {
			setCatch("something went wrong, try again");
			console.log(error);
		}
	}
	return (
		<div>
			<div className="regiterWrapper">
				<form onSubmit={handleSubmit}>
					<section className="inputss">
						{alert && <div className="alerts">{alert}</div>}
						{error && <div className="alerts">{error}</div>}
						{createdMessage && <div className="alerts">{createdMessage}</div>}
						{errorCatch && <div className="alerts">{errorCatch}</div>}
						<input type="text" ref={userNameDom} placeholder="User name" />
						<div className="fifty">
							<input
								type="text"
								ref={firstNameDom}
								placeholder="First name"
								className="p-l"
							/>

							<input
								className="p-r"
								type="text"
								name=""
								ref={lastNameDom}
								placeholder="Last name"
							/>
						</div>

						<input type="email" ref={emailDom} placeholder="Email address" />

						<div className="password">
							<input
								type={showPassword ? "text" : "password"}
								ref={passwordDom}
								placeholder="password"
							/>
							<span onClick={togglePasswordVisibility}>
								{showPassword ? (
									<FaRegEye className="eye" />
								) : (
									<FaRegEyeSlash className="eye" />
								)}
							</span>
						</div>
						<div className="lastones">
							<span className="terms">
								I agree to the <a className="onhover">privacy policy</a> and
								<a className="onhover">terms of service</a>.
							</span>
							<button className="agree">Agree and Join</button>
						</div>
					</section>
				</form>
			</div>
		</div>
	);
}

export default Register;
