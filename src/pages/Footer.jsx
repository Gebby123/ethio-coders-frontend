import React from "react";
import logo2 from "../image/logo2.png"
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import facebook from "../image/facebook.png"
import linkedin from "../image/linkedin.png"
import github from "../image/github.jpg"
import "./Footer.css";
function Footer() {
	return (
    <div className="footer-top mt-1">
      <div className="container">
        <div className="footer-bottom-content clearfix">
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <div className="logo-footer">
                <img src={logo2} alt="evangadi logo" />
              </div>

              <ul className="footer-social-list list-social list-inline">
                <li>
                  <a
                    href="https://www.facebook.com/gebrehiwot.tesfaye.31"
                    target="_blank"
                  >
                    <FaFacebook />
                    <i className="social_facebook "></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/feed/?trk=homepage-basic_sign-in-submit"
                    target="_blank"
                  >
                    <FaLinkedin />
                    <i className="social_instagram "></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Gebby123?tab=repositories"
                    target="_blank"
                  >
                    <FaGithub />
                    <i className="social_youtube "></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-4">
              <h5>Useful Link</h5>
              <ul className="list-menu">
                <li>
                  <a href="/explained">How it works </a>
                </li>
                <li>
                  <a href="/legal/terms/">Terms of Service</a>
                </li>
                <li>
                  <a href="/legal/privacy/">Privacy policy</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-4">
              <h5>Contact Info</h5>
              <ul className="list-menu contact-list">
                <li>Ethio-Coders</li>
                <li>ethiocoders@gmail.com</li>
                <li>+251-799-339-981</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
