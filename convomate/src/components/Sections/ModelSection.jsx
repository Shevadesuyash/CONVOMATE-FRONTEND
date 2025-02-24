import React from 'react';
import { Link } from 'react-router-dom';

// Import images using the correct relative path
import Image6 from '../../assets/img/6.jpeg';
import Image7 from '../../assets/img/7.png';
import Image11 from '../../assets/img/11.jpeg';

const ModelSection = () => {
  return (
    <section id="intro">
      <div className="intro-content">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="row">
            {/* First Image Column */}
            <div className="col-lg-6">
              <img alt="First Image" src={Image6} style={{ width: '50%', height: 'auto' }} />
              <br /><br />
              <button className="btn btn-primary" style={{ backgroundColor: '#76D7C4', color: 'black' }}>
                <Link to="/users" style={{ color: 'black' }}>Let's Start (User Data for Admin)</Link>
              </button>
            </div>

            {/* Second Image Column */}
            <div className="col-lg-6">
              <img alt="Second Image" src={Image7} style={{ width: '50%', height: '70%' }} />
              <br /><br />
              <button className="btn btn-primary" style={{ backgroundColor: '#76D7C4', color: 'black' }}>
                <Link to="/users" style={{ color: 'black' }}>Let's Start (User Data for Admin)</Link>
              </button>
            </div>

            {/* Third Image Column */}
            <div className="col-lg-6">
              <img alt="Third Image" src={Image11} style={{ width: '50%', height: 'auto' }} />
              <br /><br />
              <button className="btn btn-primary" style={{ backgroundColor: '#76D7C4', color: 'black' }}>
                <Link to="/translator" style={{ color: 'black' }}>Let's Start</Link>
              </button>
            </div>

            {/* Fourth Image Column */}
            <div className="col-lg-6">
              <img alt="Fourth Image" src={Image11} style={{ width: '50%', height: 'auto' }} />
              <br /><br />
              <button className="btn btn-primary" style={{ backgroundColor: '#76D7C4', color: 'black' }}>
                <Link to="/translator" style={{ color: 'black' }}>Let's Start</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelSection;