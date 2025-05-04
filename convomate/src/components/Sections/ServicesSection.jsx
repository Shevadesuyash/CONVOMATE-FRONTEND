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
              <div className="icon"><i className="fa fa-check-square-o"></i></div> {/* Changed icon */}
              <h4 className="title"><a href="#">Grammar Checker</a></h4> {/* Updated title */}
              <p className="description">Ensure your writing is clear and error-free. This tool helps you identify and correct grammatical mistakes, spelling errors, and punctuation issues in your text.</p> {/* Updated description */}
            </div>
          </div>
          <div className="col-lg-6 mb-4"> {/* Added mb-4 for spacing */}
            <div className="box wow fadeInRight">
              <div className="icon"><i className="fa fa-commenting-o"></i></div> {/* Changed icon */}
              <h4 className="title"><a href="#">ConvoMate Chatbot</a></h4> {/* Updated title */}
              <p className="description">Engage in natural and helpful conversations. This chatbot can understand your queries, provide information, and assist you with various tasks in a conversational manner.</p> {/* Updated description */}
            </div>
          </div>
          <div className="col-lg-6 mb-4"> {/* Added mb-4 for spacing */}
            <div className="box wow fadeInRight" data-wow-delay="0.2s">
              <div className="icon"><i className="fa fa-language"></i></div> {/* Changed icon */}
              <h4 className="title"><a href="#">Language Translator</a></h4> {/* Updated title */}
              <p className="description">Break down language barriers. This tool allows you to translate text from one language to another, facilitating communication across different linguistic communities.</p> {/* Updated description */}
            </div>
          </div>
          <div className="col-lg-6 mb-4"> {/* Added mb-4 for spacing */}
            <div className="box wow fadeInLeft" data-wow-delay="0.2s">
              <div className="icon"><i className="fa fa-file-text-o"></i></div> {/* Changed icon */}
              <h4 className="title"><a href="#">Text Summarizer</a></h4> {/* Updated title */}
              <p className="description">Get the key information quickly. This tool can condense long pieces of text into concise summaries, saving you time and effort in understanding the main points.</p> {/* Updated description */}
            </div>
          </div>
</div>
      </div>
    </section>
  );
};

export default ServicesSection;