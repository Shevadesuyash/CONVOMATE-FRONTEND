import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/style.css";
import introImage from "../../assets/img/4.jpeg"; // Import the image

const IntroSection = () => {
  return (
    <section id="intro">
      {/* Image Section (Moved to Left) */}
      <div className="intro-image">
        <img src={introImage} alt="AI Voice Bot" />
      </div>

      {/* Text Content (Moved to Right) */}
      <div className="intro-content">
        <h2>
          An AI for,
          <br />
          <span>Better</span> Communication
        </h2>
        <div>
          <Link to="/model" className="btn-get-started scrollto">
            Get Started
          </Link>
          <Link to="/model" className="btn-projects scrollto">
            Our Models
          </Link>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
