import React from 'react';

const ServicesSection = () => {
  return (
    <section id="services">
      <div className="container11">
        <div className="section-header">
          <h2>Services</h2>
          <p>Following are the services provided by our Convomate!</p>
        </div>

        <div className="row">
          <div className="col-lg-6 mb-4"> {/* Added mb-4 for spacing */}
            <div className="box wow fadeInLeft">
              <div className="icon"><i className="fa fa-bar-chart"></i></div>
              <h4 className="title"><a href="#">Voice Convomate</a></h4>
              <p className="description">User can communicate with the bot by entering text or by voice, Convomate will correct any grammatical mistake in it and will have a casual communicate with you as a human.</p>
            </div>
          </div>
          <div className="col-lg-6 mb-4"> {/* Added mb-4 for spacing */}
            <div className="box wow fadeInRight">
              <div className="icon"><i className="fa fa-picture-o"></i></div>
              <h4 className="title"><a href="#">Text to Voice</a></h4>
              <p className="description">Convert text to voice and vice-versa. Additionally, it can transcribe spoken words into text with high accuracy, making communication smoother and more efficient.</p>
            </div>
          </div>
          <div className="col-lg-6 mb-4"> {/* Added mb-4 for spacing */}
            <div className="box wow fadeInRight" data-wow-delay="0.2s">
              <div className="icon"><i className="fa fa-map"></i></div>
              <h4 className="title"><a href="#">Paragraph Checker</a></h4>
              <p className="description">Correct grammatical errors in written paragraphs.on.Automatically detect and correct grammatical errors in written paragraphs with precision. This feature analyzes sentence structure, punctuation, spelling, and word usage to enhance clarity and readability.</p>
            </div>
          </div>
          <div className="col-lg-6 mb-4"> {/* Added mb-4 for spacing */}
            <div className="box wow fadeInLeft" data-wow-delay="0.2s">
              <div className="icon"><i className="fa fa-shopping-bag"></i></div>
              <h4 className="title"><a href="#">Learning Basics of a Language</a></h4>
              <p className="description">Learn basic phrases of foreign languages like Japanese, French, German, etc.Enhance your communication skills by learning essential phrases in foreign languages such as Japanese, French, German, and more. This feature provides  help to navigate different linguistic and cultural contexts.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;