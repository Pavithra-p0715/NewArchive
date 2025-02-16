"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EditIcon from "@mui/icons-material/Edit";
import useNotes from "@/app/portal/about/components/AboutService/useAboutAction";
import Notes from "@/app/portal/about/components/Notes";
import { State } from "@/app/portal/about/interface/interface";

  const About = () => {

  const [state, setState] = useState<State>({
    notes: [],
    open: false,
    isEditing: false,
    currentIndex: null,
    value: { title: "", content: "" },
  });

  const [message, setMessage] = useState<string | null>(null);

  const {
    handleChange,
    handleAddNote,
    handleEditNote,
    handleSaveNote,
    handleDeleteNote,
    resetNote,
  } = useNotes({
    state,
    setState,
    onMessage: setMessage as React.Dispatch<React.SetStateAction<string>>,
  });
  const [user, setUser] = useState<{ email: string } | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("activeUser");
    console.log("Stored User:", storedUser);

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Parsed User:", parsedUser);

        if (parsedUser && parsedUser.email) {
          setUser(parsedUser);
        } else {
          console.warn("User object does not contain an email property.");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <>
      <Container sx={{ paddingTop: "16px" }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          {user ? `Good Morning: ${user.email}` : "Guest User"}
        </Typography>
        {state.notes.length > 0 ? (
          <Box
            sx={{
              height: "50vh",
              width: "50vh",
              overflowY: "auto",
              padding: 2,
              border: "1px solid #ccc",
              borderRadius: 2,
              backgroundColor: "#f9f9f9",
            }}
          >
            {state.notes.map((note, index) => (
              <Paper
                key={index}
                elevation={3}
                sx={{
                  padding: 2,
                  marginBottom: 2,
                  backgroundColor: "#fff",
                  borderRadius: 2,
                  position: "relative",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ color: "#333" }}
                >
                  {note.title}
                </Typography>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  {note.content}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ display: "block", marginTop: 1, color: "#888" }}
                >
                  Created on: {note.createdAt}
                </Typography>
                <IconButton
                  sx={{ position: "absolute", top: 8, right: 8 }}
                  onClick={() => handleEditNote(index)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Paper>
            ))}
          </Box>
        ) : (
          ""
        )}
        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            backgroundColor: "white",
            borderRadius: "50%",
            boxShadow: 3,
            p: 1,
            cursor: "pointer",
          }}
          onClick={resetNote}
        >
          <AssignmentIcon sx={{ fontSize: 40, color: "primary.main" }} />
        </Box>

        <Notes
          open={state.open}
          onClose={() => setState({ ...state, open: false })}
          value={state.value}
          onValueChange={handleChange}
          onAdd={handleAddNote}
          isEditing={state.isEditing}
          onSave={handleSaveNote}
          onDelete={handleDeleteNote}
        />

        <Snackbar
          open={!!message}
          autoHideDuration={3000}
          onClose={() => setMessage(null)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{ paddingTop: "10vh" }}
        >
          <Alert onClose={() => setMessage(null)} severity="success">
            {message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}

export default About;
