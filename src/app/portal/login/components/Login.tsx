"use client";

import { useState } from "react";
import {
  Button,
  Container,
  Box,
  CircularProgress,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import useSignUp from "@/app/portal/login/components/LoginService/useSinup";
import SignUp from "@/app/portal/login/components/SinUp";
import LoginPopup from "@/app/common/components/LoginForm";
import CustomTypography from "@/app/common/components/CustomTypography";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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

  const handleLoginWrapper = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", {
      email: formData.email,
      password: formData.password,
    });

    await handleLogin(
      e,
      { email: formData.email, password: formData.password },
      setLoading,
      setError,
      router
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
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
          handleRegister={handleRegister}
          setShowSignUp={setShowSignUp}
        />
      ) : (
        <LoginPopup title="Login" error={error} message={message}>
          <Box sx={{ px: 4 }}>
            <CustomTypography
              text="Login"
              sx={{ color: "#8B4513", textAlign: "center" }}
              variant="h2"
            />

            <Box
              component="form"
              onSubmit={handleLoginWrapper}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <CustomTypography text="Email" />
              <TextField
                fullWidth
                variant="outlined"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <CustomTypography text="Password" />
              <TextField
                fullWidth
                variant="outlined"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  style: { backgroundColor: " #E8EFFB " },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  px: 2,
                }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  sx={{
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    backgroundColor: "#F3D1B4",
                    color: "black",
                  }}
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
                  sx={{
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    backgroundColor: "#568D94",
                  }}
                >
                  Register
                </Button>
              </Box>
            </Box>
          </Box>
        </LoginPopup>
      )}
    </Container>
  );
};

export default LoginPage;
