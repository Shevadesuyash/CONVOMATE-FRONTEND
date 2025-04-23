import React from 'react';
import '../../assets/css/style.css'; // Updated to Main.css
import Team1 from '../../assets/img/team-1.jpeg';
import Team2 from '../../assets/img/team-2.jpeg';
import Team3 from '../../assets/img/team-3.jpeg';
import Team4 from '../../assets/img/team-4.jpeg';

const TeamSection = () => {
  return (
    <section id="team">
      <div className="container11">
        <div className="section-header">
          <h2>Our Team</h2>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="member">
              <div className="pic">
                <img src={Team1} alt="Suyash Shevade" />
              </div>
              <div className="details">
                <h4>Suyash Shevade</h4>
                <span>Backend Developer</span>
                <div className="social">
                  <a href="#"><i className="fa fa-twitter"></i></a>
                  <a href="#"><i className="fa fa-facebook"></i></a>
                  <a href="#"><i className="fa fa-google-plus"></i></a>
                  <a href="#"><i className="fa fa-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="member">
              <div className="pic">
                <img src={Team2} alt="Taranjeet Kaur" />
              </div>
              <div className="details">
                <h4>Taranjeet Kaur</h4>
                <span>Frontend Developer</span>
                <div className="social">
                  <a href="#"><i className="fa fa-twitter"></i></a>
                  <a href="#"><i className="fa fa-facebook"></i></a>
                  <a href="#"><i className="fa fa-google-plus"></i></a>
                  <a href="#"><i className="fa fa-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="member">
              <div className="pic">
                <img src={Team3} alt="Abhijeet Borkar" />
              </div>
              <div className="details">
                <h4>Abhijeet Borkar</h4>
                <span>Frontend Developer</span>
                <div className="social">
                  <a href="#"><i className="fa fa-twitter"></i></a>
                  <a href="#"><i className="fa fa-facebook"></i></a>
                  <a href="#"><i className="fa fa-google-plus"></i></a>
                  <a href="#"><i className="fa fa-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="member">
              <div className="pic">
                <img src={Team4} alt="Roshan Anand" />
              </div>
              <div className="details">
                <h4>Roshan Anand</h4>
                <span>Machine Learning</span>
                <div className="social">
                  <a href="#"><i className="fa fa-twitter"></i></a>
                  <a href="#"><i className="fa fa-facebook"></i></a>
                  <a href="#"><i className="fa fa-google-plus"></i></a>
                  <a href="#"><i className="fa fa-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;