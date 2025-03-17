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
    <section id="intro">
      <div className="intro-content">
        <form onSubmit={handleSubmit}>
          <div className="container" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h1 className="text-primary text-center mb-4" style={{ fontWeight: 700 }}>
              Login
            </h1>
            {error && <div className="alert alert-danger">{error}</div>}
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
                disabled={loading}
              />
            </div>
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
                  disabled={loading}
                />
              </div>
            )}
            {!otpSent && (
              <div className="form-group text-center">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={handleGenerateOtp}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send OTP'}
                </button>
              </div>
            )}
            {otpSent && (
              <>
                <div className="form-group text-center">
                  <button
                    type="button"
                    className="btn btn-secondary btn-block"
                    onClick={handleResendOtp}
                    disabled={timer > 0 || loading}
                  >
                    Resend OTP {timer > 0 ? `(${timer}s)` : ''}
                  </button>
                </div>
                <div className="form-group text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit OTP'}
                  </button>
                </div>
              </>
            )}
            <div className="text-center mt-2">
              <span>Not registered? <a href="/register">Register/Signup here</a></span>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginSection;