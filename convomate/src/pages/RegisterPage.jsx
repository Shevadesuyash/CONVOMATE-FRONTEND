import React, { useState } from 'react';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !name || !email) {
      setError('Please fill in all fields.');
      return;
    }
    // Add logic to send registration data to the backend
    console.log('Registration data:', { username, name, email });
  };

  return (
    <section id="intro">
      <div className="intro-content">
        <form onSubmit={handleSubmit}>
          <div className="container text-right" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h1 className="text-primary" style={{ padding: '25px' }}>Registration</h1>

            {/* Error message */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Username input */}
            <div className="form-group">
              <label htmlFor="username"><b>Username</b></label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="form-control"
              />
            </div>

            {/* Name input */}
            <div className="form-group">
              <label htmlFor="name"><b>Name</b></label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-control"
              />
            </div>

            {/* Email input */}
            <div className="form-group">
              <label htmlFor="email"><b>Email</b></label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
              />
            </div>

            {/* Submit button */}
            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>

            {/* Login link */}
            <div className="text-center mt-2">
              <span>Already registered? <a href="/login">Login here</a></span>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;