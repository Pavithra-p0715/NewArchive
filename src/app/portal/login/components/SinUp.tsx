import React from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Container,
  Alert,
} from "@mui/material";
import { SignUpProps } from "@/app/portal/login/interface/interface";

const SignUp: React.FC<SignUpProps> = ({
  formData,
  setFormData,
  error,
  message,
  handleRegister,
  setShowSignUp,
  setError,
  setMessage,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRegister(e, formData, setError, setMessage, setShowSignUp);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{ padding: 4, width: "100%", maxWidth: 400, textAlign: "center" }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Sign Up
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {message && <Alert severity="success">{message}</Alert>}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            type="password"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <Box sx={{ display: "flex", gap: "8px" }}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Register
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => setShowSignUp(false)}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUp;
