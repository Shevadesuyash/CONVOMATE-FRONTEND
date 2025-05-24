import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginSection from "../components/Sections/LoginSection";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(30);
  const { generateOtp, login, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleGenerateOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await generateOtp(email);
      console.log("OTP generated:", response);
      setOtpSent(true);
      setTimer(30);
    } catch (err) {
      console.error("OTP generation failed:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) return;
    try {
      const response = await login(email, otp);
      console.log("Login successful:", response);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleResendOtp = async () => {
    try {
      await generateOtp(email);
      setTimer(30);
    } catch (err) {
      console.error("OTP resend failed:", err);
    }
  };

  useEffect(() => {
    if (otpSent && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [otpSent, timer]);

  return (
    <LoginSection
      email={email}
      setEmail={setEmail}
      otp={otp}
      setOtp={setOtp}
      otpSent={otpSent}
      timer={timer}
      error={error}
      loading={loading}
      handleGenerateOtp={handleGenerateOtp}
      handleResendOtp={handleResendOtp}
      handleSubmit={handleSubmit}
    />
  );
};

export default LoginPage;
