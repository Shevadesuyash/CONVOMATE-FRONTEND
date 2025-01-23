import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., make an API request)
    console.log('Form Submitted:', formData);
  };

  return (
    <section id="intro">
      <div className="intro-content">
        <form action="/register/save" method="post" role="form" onSubmit={handleSubmit}>
          <div className="container text-right">
            <h1 className="text-primary" style={{ padding: '25px' }}>Registration</h1>

            <label htmlFor="firstName"><b>First Name</b></label>
            <input
              id="firstName"
              name="firstName"
              placeholder="First Name"
              required
              type="text"
              value={formData.firstName}
              onChange={handleChange}
            /><br />

            <label htmlFor="lastName"><b>Last Name</b></label>
            <input
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              required
              type="text"
              value={formData.lastName}
              onChange={handleChange}
            /><br />

            <label htmlFor="email"><b>Email</b></label>
            <input
              id="email"
              name="email"
              placeholder="Email"
              required
              type="email"
              value={formData.email}
              onChange={handleChange}
            /><br />

            <label htmlFor="password"><b>Password</b></label>
            <input
              id="password"
              name="password"
              placeholder="Password"
              required
              type="password"
              value={formData.password}
              onChange={handleChange}
            /><br />

            <button className="btn btn-primary" type="submit">Register</button>
            <span>Already registered? <a href="/login">Login here</a></span>
          </div>
        </form>
      </div>

      <div className="alert alert-info" id="successMessage" style={{ display: 'none' }}>
        You have successfully registered to our app!
      </div>
    </section>
  );
};

export default RegistrationForm;
