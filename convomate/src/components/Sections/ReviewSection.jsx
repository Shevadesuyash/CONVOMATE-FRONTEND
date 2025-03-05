import React, { useState } from 'react';
import api from '../../api';

const ReviewSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.submitReview(formData);
      alert('Review submitted successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
    } catch (err) {
      setError(err.message || 'Failed to submit review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact1">
      <div className="container">
        <div className="section-header">
          <h2>Review</h2>
        </div>
        <div className="form">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit} className="contactForm" method="post" role="form">
            <div className="form-row">
              <div className="form-group col-md-6">
                <input
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={loading}
                />
                <div className="validation"></div>
              </div>
              <div className="form-group col-md-6">
                <input
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={loading}
                />
                <div className="validation"></div>
              </div>
            </div>
            <div className="form-group">
              <input
                className="form-control"
                id="subject"
                name="subject"
                placeholder="Subject"
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                disabled={loading}
              />
              <div className="validation"></div>
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                name="message"
                placeholder="Message"
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                disabled={loading}
              />
              <div className="validation"></div>
            </div>
            <div className="text-center">
              <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;