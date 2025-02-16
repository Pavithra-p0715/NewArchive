"use client";

import React from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  Modal,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { NotesProps } from "@/app/portal/about/interface/interface";

const Notes: React.FC<NotesProps> = ({
  open,
  onClose,
  value,
  onValueChange,
  onAdd,
  isEditing,
  onSave,
  onDelete,
}) => {
  return (
    <Modal
      open={open}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 5,
          minWidth: "50vw",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" color="primary" fontWeight="bold">
              {isEditing ? "Edit Note" : "Add Note"}
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          {isEditing ? (
            ""
          ) : (
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={value.title}
              onChange={(e) => onValueChange("title", e.target.value)}
            />
          )}
          <TextField
            fullWidth
            label="Write your note..."
            multiline
            rows={4}
            variant="outlined"
            value={value.content}
            onChange={(e) => onValueChange("content", e.target.value)}
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: "16px" }}
          >
            {isEditing ? (
              <>
                <Button variant="contained" color="primary" onClick={onSave}>
                  Save
                </Button>
                <Button variant="contained" color="error" onClick={onDelete}>
                  Delete
                </Button>
              </>
            ) : (
              <>
                <Button variant="contained" color="success" onClick={onAdd}>
                  Add
                </Button>
                <Button variant="contained" color="error" onClick={onClose}>
                  Cancel
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default Notes;
