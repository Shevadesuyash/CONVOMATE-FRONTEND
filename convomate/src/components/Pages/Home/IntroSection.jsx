import React from 'react';
import { Link } from 'react-router-dom';

const IntroSection = () => {
  return (
    <section id="intro">
      <div className="intro-content">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="row">
            <div className="col-lg-6">
              <img alt="First Image" src="img/6.jpeg" style={{ width: '50%', height: 'auto' }} /><br /><br />
              <button className="btn btn-primary" style={{ backgroundColor: '#76D7C4', color: 'black' }} type="button">
                <Link to="/users" style={{ color: 'black' }}>Let's Start (User Data for Admin)</Link>
              </button>
            </div>

            <div className="col-lg-6">
              <img alt="Second Image" src="img/7.png" style={{ width: '50%', height: '70%' }} /><br /><br />
              <button className="btn btn-primary" style={{ backgroundColor: '#76D7C4', color: 'white' }} type="button">
                <Link to="/users" style={{ color: 'black' }}>Let's Start (User Data for Admin)</Link>
              </button>
            </div>

            <div className="col-lg-6">
              <img alt="Third Image" src="img/11.jpeg" style={{ width: '50%', height: 'auto' }} /><br /><br />
              <button className="btn btn-primary" style={{ backgroundColor: '#76D7C4', color: 'black' }} type="button">
                <Link to="/translator" style={{ color: 'black' }}>Let's Start</Link>
              </button>
            </div>

            <div className="col-lg-6">
              <img alt="Fourth Image" src="img/11.jpeg" style={{ width: '50%', height: 'auto' }} /><br /><br />
              <button className="btn btn-primary" style={{ backgroundColor: '#76D7C4', color: 'black' }} type="button">
                <Link to="/translator" style={{ color: 'black' }}>Let's Start</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
