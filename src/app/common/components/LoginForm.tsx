import React from "react";
import { Paper, Typography, Alert, Box, IconButton } from "@mui/material";
import CustomTypography from "./CustomTypography";
import Line from "./Line";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
interface LoginPopupProps {
  title: string;
  error?: string | null;
  message?: string;
  children: React.ReactNode;
  isEdit?: boolean;
  onEditOpen?: () => void;
  onDelete?: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({
  title,
  error,
  message,
  children,
  isEdit = false,
  onEditOpen,
  onDelete,
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CustomTypography text={title} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 1,
          }}
        >
          {isEdit && (
            <>
              <IconButton onClick={() => onEditOpen?.()}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={onDelete}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </Box>
      </Box>

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
