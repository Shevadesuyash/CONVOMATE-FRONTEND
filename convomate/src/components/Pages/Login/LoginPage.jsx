import React, { useState } from 'react';
import Header from '../../Layout/Header';
import TopBar from '../../Layout/TopBar';
import Footer from '../../Layout/Footer';

const LoginPage = () => {
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    // You can add logic here to check the login credentials (e.g. send request to server)
    if (username !== 'test@example.com' || password !== 'password') {
      setError(true);
    } else {
      setError(false);
      // Redirect to another page after successful login
    }
  };

  return (
    <div>
      <TopBar />
      <Header />

      <section id="intro">
        <div className="intro-content">
          <form onSubmit={handleSubmit}>
            <div className="container" style={{ maxWidth: '400px', margin: '0 auto' }}>
              <h1 className="text-primary text-center mb-4" style={{ fontWeight: 700 }}>Login</h1>

              {error && <div className="alert alert-danger">Invalid Email or Password</div>}

              <div className="form-group">
                <label htmlFor="username"><b>Username</b></label>
                <input
                  autocomplete="off"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="Enter Email"
                  required
                  type="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password"><b>Password</b></label>
                <input
                  autocomplete="off"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  required
                  type="password"
                />
              </div>

              <div className="form-group text-center">
                <button className="btn btn-primary btn-block" type="submit">Login</button>
              </div>

              <div className="text-center mt-2">
                <span>Not registered? <a href="/register">Register/Signup here</a></span>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LoginPage;
