import React from 'react';
import "./About.css";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./carousel.css";
import AuthCarousel from "./AuthCarousel";
function About() {
	return (
		<section id="home">
			
			<div className="slide-home">
				<div className="slide-item">
					<div className="container">
						<div className="row hero-padd">
							<div className="  col-sm-12 col-md-6">
								<div className="authfy-login">
									
									<AuthCarousel/>
								</div>
							</div>

							<div className="  col-sm-12 col-md-6  p-5 signs aboutMainWrapper">
								<div className="aboutMainWrapper">
									<p className="aboutColor">About</p>
									<h2 className="abouttitle">Ethio-coders Q&A platform</h2>
									<div className="textColor">
										<p>
											No matter what stage of life you are in, whether you’re
											just starting elementary school or being promoted to CEO
											of a Fortune 500 company, you have much to offer to those
											who are trying to follow in your footsteps.
										</p>

										<p>
											Wheather you are willing to share your knowledge or you
											are just looking to meet mentors of your own, please start
											by joining the network here.
										</p>
									</div>

									<button className="aboutButton">HOW IT WORKS</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			    
		</section>
	);
}



export default About;
