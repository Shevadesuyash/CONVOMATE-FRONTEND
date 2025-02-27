import React from 'react';
import "../../assets/css/style.css";
import aboutImg from "../../assets/img/about-img.jpeg"; // Correct import for Webpack


const AboutSection = () => {
  return (
    <section id="about" className="wow fadeInUp">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 about-img">
            <img src={aboutImg} alt="About" /> {/* Use the imported image */}
          </div>

          <div className="col-lg-6 content">
            <h2>"Communication – the human connection – is the key to personal and career success."</h2>

            <ul>
              <li>
                <i className="ion-android-checkmark-circle"></i>
                At Convomate, we believe in the power of meaningful conversations to uplift your skills and enrich your journey of self-improvement.
              </li>
              <li>
                <i className="ion-android-checkmark-circle"></i>
                Convomate is not just a platform; it's your companion in skill development, ensuring that every conversation adds value to your personal and professional journey.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
