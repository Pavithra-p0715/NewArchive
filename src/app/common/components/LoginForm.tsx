import React from "react";
import { Paper, Typography, Alert, Box } from "@mui/material";
import CustomTypography from "./CustomTypography";
import Line from "./Line";

interface LoginPopupProps {
  title: string;
  error?: string | null;
  message?: string;
  children: React.ReactNode;
}

const LoginPopup: React.FC<LoginPopupProps> = ({
  title,
  error,
  message,
  children,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        width: "100%",
        maxWidth: 400,
        backgroundColor: "#F4F2DE",
        border: "2px solid #8B4513",
        borderRadius: "8px",
      }}
    >
      <CustomTypography text={title} />
      <Line sx={{ borderColor: "#8B4513", borderWidth: "2px", marginY: 2 }} />

      {error && <Alert severity="error">{error}</Alert>}
      {message && <Alert severity="success">{message}</Alert>}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {children}
      </Box>
    </Paper>
  );
};

export default LoginPopup;
