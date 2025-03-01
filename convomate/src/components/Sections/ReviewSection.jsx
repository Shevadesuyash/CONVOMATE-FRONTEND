import React from 'react';
import "../../assets/css/style.css";

const ReviewSection = () => {
  return (
    <section id="contact1">
      <div className="container">
        <div className="section-header">
          <h2>Review</h2>
        </div>
        <div className="form">
          <div id="sendmessage">Your message has been sent. Thank you!</div>
          <div id="errormessage"></div>
          <form action="" className="contactForm" method="post" role="form">
            <div className="form-row">
              <div className="form-group col-md-6">
                <input className="form-control" data-msg="Please enter at least 4 chars" data-rule="minlen:4" id="name" name="name" placeholder="Your Name" type="text" />
                <div className="validation"></div>
              </div>
              <div className="form-group col-md-6">
                <input className="form-control" data-msg="Please enter a valid email" data-rule="email" id="email" name="email" placeholder="Your Email" type="email" />
                <div className="validation"></div>
              </div>
            </div>
            <div className="form-group">
              <input className="form-control" data-msg="Please enter at least 8 chars of subject" data-rule="minlen:4" id="subject" name="subject" placeholder="Subject" type="text" />
              <div className="validation"></div>
            </div>
            <div className="form-group">
              <textarea className="form-control" data-msg="Please write something for us" data-rule="required" name="message" placeholder="Message" rows="5"></textarea>
              <div className="validation"></div>
            </div>
            <div className="text-center">
              <button type="submit">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;