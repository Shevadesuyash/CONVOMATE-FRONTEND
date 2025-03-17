import React from 'react';

const ServicesSection = () => {
  return (
    <section id="services">
      <div className="container">

        {/* Section Header */}
        <div className="section-header">
          <h2>Services</h2>
          <p>Following are the services provided by our Convomate!</p>
        </div>

        {/* Main Service */}
        <div className="main-service box">
          <div className="icon"><i className="fa fa-bar-chart"></i></div>
          <h4 className="title"><span>Voice Convomate</span></h4>
          <p className="description">
            User can communicate with the bot by entering text or by voice. Convomate will correct any grammatical mistakes and engage in a casual human-like conversation.
          </p>
        </div>

        {/* Services Grid - Two Columns */}
        <div className="services-grid">
          <div className="box">
            <div className="icon"><i className="fa fa-picture-o"></i></div>
            <h4 className="title"><span>Text to Voice</span></h4>
            <p className="description">Convert text to voice and vice-versa.</p>
          </div>
          <div className="box">
            <div className="icon"><i className="fa fa-map"></i></div>
            <h4 className="title"><span>Paragraph Checker</span></h4>
            <p className="description">Correct grammatical errors in written paragraphs.</p>
          </div>
          <div className="box">
            <div className="icon"><i className="fa fa-shopping-bag"></i></div>
            <h4 className="title"><span>Learning Basics of a Language</span></h4>
            <p className="description">Learn basic phrases of foreign languages like Japanese, French, German, etc.</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
