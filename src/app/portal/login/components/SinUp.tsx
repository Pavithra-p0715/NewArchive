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
import LoginPopup from "@/app/common/components/LoginForm";
import CustomTypography from "@/app/common/components/CustomTypography";

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
      <LoginPopup title="Sinup" error={error} message={message}>
        <CustomTypography
          sx={{ textAlign: "center", color: "#8B4513" }}
          text="Singup"
          variant={"h2"}
        />

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <CustomTypography text="UserName" />
          <TextField
            fullWidth
            label=""
            variant="outlined"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
          />
          <CustomTypography text="Email" />

          <TextField
            fullWidth
            label=""
            variant="outlined"
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <CustomTypography text="password" />

          <TextField
            fullWidth
            label=""
            variant="outlined"
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <CustomTypography text="ConfirmPassword" />

          <TextField
            fullWidth
            label=""
            variant="outlined"
            type="password"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <Box sx={{ display: "flex", gap: "8px" }}>
            <Button type="submit" fullWidth variant="contained" color="success">
              Register
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ backgroundColor: "#F3D1B4", color: "black" }}
              onClick={() => setShowSignUp(false)}
            >
              Login
            </Button>
          </Box>
        </Box>
      </LoginPopup>
    </Container>
  );
};

export default SignUp;
