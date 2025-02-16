"use client";

import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Snackbar, Alert } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import useNotes from "@/app/portal/about/components/AboutService/useAboutAction";
import Notes from "@/app/portal/about/components/Notes";
import { State } from "@/app/portal/about/interface/interface";
import LoginPopup from "@/app/common/components/LoginForm";
import CustomTypography from "@/app/common/components/CustomTypography";

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
          <Box>
            {state.notes.map((note, index) => (
              <LoginPopup
                key={note.title || index}
                title={note.title}
                isEdit={true}
                onEditOpen={() => handleEditNote(index)}
              >
                <CustomTypography text={note.content} sx={{ color: "##555" }} />
                <CustomTypography
                  sx={{ display: "block", marginTop: 1, color: "#555" }}
                  text={`Created on: ${note.createdAt}`}
                />
              </LoginPopup>
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
            backgroundColor: "#E6B89C",
            borderRadius: "50%",
            boxShadow: 3,
            p: 1,
            cursor: "pointer",
          }}
          onClick={resetNote}
        >
          <AssignmentIcon sx={{ fontSize: 40, color: "#FFF" }} />
        </Box>

        <Notes
          open={state.open}
          onClose={() => setState({ ...state, open: false })}
          value={state.value}
          onValueChange={handleChange}
          onAdd={handleAddNote}
          isEditing={state.isEditing}
          onSave={handleSaveNote}
          onDelete={() => handleDeleteNote()}
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
};

export default About;
