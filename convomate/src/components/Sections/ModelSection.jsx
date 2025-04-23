import React from 'react';
import { Link } from 'react-router-dom';
import Image6 from '../../assets/img/6.jpeg';
import Image7 from '../../assets/img/7.png';
import Image8 from '../../assets/img/8.png';
import Image11 from '../../assets/img/11.jpeg';
import bgImage from '../../assets/img/intro-carousel/bg1.jpg'; // Adjust the path as per your folder structure


const ModelSection = () => {
  return (
    <section id="intro11">
      <div className="intro-content">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="row">
            {/* First Image Column */}
            <div className="col-lg-6">
              <img alt="Second Image" src={Image7} style={{ width: '50%', height: 'auto' }} />
              <br /><br />
              <button className="btn btn-primary">
                <Link to="/model/grammar-check" style={{ color: 'black' }}>Grammar Checker </Link>
              </button>
            </div>

            {/* Second Image Column */}
            <div className="col-lg-6">
              <img alt="First Image" src={Image11} style={{ width: '50%', height: '70%' }} />
              <br /><br />
              <button className="btn btn-primary">
                <Link to="/model/Chat-bot" style={{ color: 'black' }}>ConvoMate Chatbot  </Link>
              </button>
            </div>

            {/* Third Image Column */}
            <div className="col-lg-6">
              <img alt="Third Image" src={Image6} style={{ width: '50%', height: '65%' }} />
              <br /><br />
              <button className="btn btn-primary">
                <Link to="/model/translator" style={{ color: 'black' }}>Language translator</Link>
              </button>
            </div>

            {/* Fourth Image Column */}
            <div className="col-lg-6">
              <img alt="Fourth Image" src={Image6} style={{ width: '50%', height: 'auto' }} />
              <br /><br />
              <button className="btn btn-primary">
                <Link to="/model/Summariser" style={{ color: 'black' }}>Text Summarizer </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelSection;