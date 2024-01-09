import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Login from "./login/Login";
import Register from "./Register";
// import { Link } from "react-router-dom";

function Carousels() {
	const [selectedIndex, setSelectedIndex] = useState(0);

	// to render register component
	const toggleToRegister = () => {
		setSelectedIndex(0);
	};
	// to render login component
	const toggleToLogin = () => {
		setSelectedIndex(1);
	};

	return (
		<div className="carousel-container">
			<Carousel
				showArrows={false}
				showStatus={false}
				showThumbs={false}
				selectedItem={selectedIndex}
			>
				<div>
					<>
						<h2 className="textCenterr darkbl">Join the network</h2>
						<h6 className="textCenterr registertitle">
							Already have an account?
							<span onClick={toggleToLogin} className="coloro">
								Sign in
							</span>
						</h6>
						<Register />
						<span onClick={toggleToLogin} className="already">
							Already have an account?
						</span>
					</>
				</div>
				<div>
					<>
						<h3 className="textCenter ptop">Login to your account</h3>
						<h6 className="textCenter font-size">
							Dont't have an account?
							<span onClick={toggleToRegister} className="orange">
								Create a new account
							</span>
						</h6>
						<Login />
					</>
				</div>
			</Carousel>
		</div>
	);
}

export default Carousels;
