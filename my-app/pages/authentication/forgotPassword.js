import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { HttpClient } from "@/api/client/http-client";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendOtp = async () => {
    try {
      setError("");
      const response = await HttpClient.post("api/forgot-password", { email });
      setSuccess(response.message);
      setStep(2);
    } catch (error) {
        console.log(error);
      setError(error.error || "Something went wrong");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setError("");
      const response = await HttpClient.post("api/verify-otp", { email, otp });
      setSuccess(response.message);
      setStep(3);
    } catch (error) {
      setError(error.error || "Invalid OTP");
    }
  };

  const handleResetPassword = async () => {
    try {
      setError("");
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      const response = await HttpClient.post("api/reset-password", {
        email,
        password,
        password_confirmation: confirmPassword,
      });
      setSuccess(response.message);
      setStep(1); 
    } catch (error) {
      setError(error.error || "Failed to reset password");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Forgot Password
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        {step === 1 && (
          <Box>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSendOtp}
            >
              Send OTP
            </Button>
          </Box>
        )}

        {step === 2 && (
          <Box>
            <TextField
              fullWidth
              label="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </Button>
          </Box>
        )}

        {step === 3 && (
          <Box>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleResetPassword}
            >
              Reset Password
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ForgotPassword;