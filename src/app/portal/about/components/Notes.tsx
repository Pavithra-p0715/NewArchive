"use client";

import React from "react";
import { TextField, Button, Box, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { NotesProps } from "@/app/portal/about/interface/interface";
import CustomTypography from "@/app/common/components/CustomTypography";
import Line from "@/app/common/components/Line";

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
          // backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 5,
          minWidth: "50vw",
          backgroundColor: "#F4F2DE",
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
            <CustomTypography
              text={isEditing ? "Edit Note" : "Add Note"}
              sx={{ color: "#8B4513", fontWeight: "bold" }}
            />
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Line
            sx={{ borderColor: "#8B4513", borderWidth: "2px", marginY: 2 }}
          />

          {isEditing ? (
            ""
          ) : (
            <>
              <CustomTypography
                text={"Title"}
                sx={{ color: "#8B4513", fontWeight: "bold" }}
              />
              <TextField
                fullWidth
                variant="outlined"
                value={value.title}
                onChange={(e) => onValueChange("title", e.target.value)}
              />
            </>
          )}
          <CustomTypography
            text={"Write your note..."}
            sx={{ color: "#8B4513", fontWeight: "bold" }}
          />
          <TextField
            fullWidth
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
                <>
                  <Button variant="contained" color="success" onClick={onAdd}>
                    Add
                  </Button>
                  <Button variant="contained" color="error" onClick={onClose}>
                    Cancel
                  </Button>
                </>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default Notes;
