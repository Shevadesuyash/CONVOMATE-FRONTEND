import React, { useState, useEffect } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState('');

  // Handle OTP submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otp) {
      setError('Please enter the OTP.');
      return;
    }
    // Add logic to verify OTP with the backend
    console.log('OTP submitted:', otp);
  };

  // Handle OTP resend
  const handleResendOtp = () => {
    setTimer(30); // Reset timer
    setOtpSent(true);
    // Add logic to resend OTP to the backend
    console.log('Resending OTP to:', email);
  };

  // Timer logic
  useEffect(() => {
    if (otpSent && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [otpSent, timer]);

  return (
    <section id="intro">
      <div className="intro-content">
        <form onSubmit={handleSubmit}>
          <div className="container" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h1 className="text-primary text-center mb-4" style={{ fontWeight: 700 }}>Login</h1>

            {/* Error message */}
            {error && <div className="alert alert-danger">{error}</div>}

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

            {/* OTP input (visible after OTP is sent) */}
            {otpSent && (
              <div className="form-group">
                <label htmlFor="otp"><b>OTP</b></label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
            )}

            {/* Send OTP button */}
            {!otpSent && (
              <div className="form-group text-center">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={handleResendOtp}
                >
                  Send OTP
                </button>
              </div>
            )}

            {/* Resend OTP button (visible after OTP is sent) */}
            {otpSent && (
              <div className="form-group text-center">
                <button
                  type="button"
                  className="btn btn-secondary btn-block"
                  onClick={handleResendOtp}
                  disabled={timer > 0}
                >
                  Resend OTP {timer > 0 ? `(${timer}s)` : ''}
                </button>
              </div>
            )}

            {/* Submit OTP button (visible after OTP is sent) */}
            {otpSent && (
              <div className="form-group text-center">
                <button type="submit" className="btn btn-primary btn-block">
                  Submit OTP
                </button>
              </div>
            )}

            {/* Register link */}
            <div className="text-center mt-2">
              <span>Not registered? <a href="/register">Register/Signup here</a></span>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;