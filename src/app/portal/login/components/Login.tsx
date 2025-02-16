"use client";

import { useState } from "react";
import {
  Button,
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import useSignUp from "@/app/portal/login/components/LoginService/useSinup";
import SignUp from "@/app/portal/login/components/SinUp";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [showSignUp, setShowSignUp] = useState(false);
  const router = useRouter();

  const { handleRegister, handleLogin } = useSignUp();

  const handleRegisterWrapper = (e: React.FormEvent) => {
    e.preventDefault();
    handleRegister(e, formData, setError, setMessage, setShowSignUp);
  };

  const handleLoginWrapper = (e: React.FormEvent) => {
    handleLogin(e, formData, setLoading, setError, router);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {showSignUp ? (
        <SignUp
          formData={formData}
          setFormData={setFormData}
          error={error}
          setError={setError}
          message={message}
          setMessage={setMessage}
          handleRegister={handleRegisterWrapper}
          setShowSignUp={setShowSignUp}
        />
      ) : (
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: { xs: 320, sm: 400, md: 450 },
            padding: { xs: 3, sm: 4, md: 5 },
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h5">Login</Typography>

          {error && (
            <Typography color="error" sx={{ mb: 1 }}>
              {error}
            </Typography>
          )}

          {message && (
            <Typography color="success" sx={{ mb: 1 }}>
              {message}
            </Typography>
          )}

          <Box
            component="form"
            onSubmit={handleLoginWrapper}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={() => setShowSignUp(true)}
                sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
              >
                Register
              </Button>
            </Box>
          </Box>
        </Paper>
      )}
    </Container>
  );
};
export default LoginPage;