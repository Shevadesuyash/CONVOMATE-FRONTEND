import React from 'react';
import { Link } from 'react-router-dom';
import "../../assets/css/style.css";
import introCarouselImage from '../../assets/img/intro-carousel/3.1.jpeg'; // Import the image

const IntroSection = () => {
  return (
    <section id="intro">
      <div className="intro-content">
        <h2>An Communication <span><br />Improvement</span><br />Voice Bot</h2>
        <div>
          <Link to="/models" className="btn-get-started scrollto">Undo the changes </Link>
          <Link to="/services" className="btn-projects scrollto">Our Models</Link>
        </div>ex
      </div>
      <div className="owl-carousel" id="intro-carousel">
        <div className="item" style={{ backgroundImage: `url(${introCarouselImage})` }}></div>
      </div>
    </section>
  );
};

export default IntroSection;