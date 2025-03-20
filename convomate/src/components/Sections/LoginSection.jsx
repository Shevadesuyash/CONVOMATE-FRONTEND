import React from 'react';

const LoginSection = ({
  email,
  setEmail,
  otp,
  setOtp,
  otpSent,
  timer,
  error,
  loading,
  handleGenerateOtp,
  handleResendOtp,
  handleSubmit,
}) => {
  return (
    <section id="intro" className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="container p-4 shadow-lg rounded bg-white" style={{ maxWidth: '400px' }}>
        <h2 className="text-center text-primary mb-4" style={{ fontWeight: 700 }}>Login</h2>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="email" className="me-3"><b>Email</b></label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
              disabled={loading}
              style={{ maxWidth: '250px' }}
            />
          </div>
          <div className="text-center mb-3">
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleGenerateOtp}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </div>
          {otpSent && (
            <div className="mb-3">
              <label htmlFor="otp" className="form-label"><b>OTP</b></label>
              <input
                type="text"
                id="otp"
                name="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="form-control"
                disabled={loading}
              />
            </div>
          )}
          <div className="text-center mt-3">
            <span>Not registered? <a href="/register" className="text-decoration-none">Register/Signup here</a></span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginSection;