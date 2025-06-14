import {
  AppBar,
  Box,
  Container,
  Toolbar,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Paper,
} from "@mui/material";
import { useState } from "react";
import "./App.css";
import ReplyGenerator from "./components/ReplyGenerator";
import EmailGenerator from "./components/EmailGenerator";

function App() {
  const [mode, setMode] = useState("generate");

  const handleChange = (event, newMode) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };

  return (
    <>
      {/* Navbar */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img src="../public/robot.jpg" alt="Logo" height="32" />
            <Typography variant="h6" fontWeight="bold">
              EM
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(to right, #00C9FF, #92FE9D)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "bold",
                }}
              >
                AI
              </Box>
              L.
            </Typography>
          </Box>

          <ToggleButtonGroup
            color="primary"
            value={mode}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="generate">Generate</ToggleButton>
            <ToggleButton value="reply">Reply</ToggleButton>
          </ToggleButtonGroup>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Container maxWidth="md">
        {mode === "reply" && <ReplyGenerator />}
        {mode === "generate" && <EmailGenerator />}
      </Container>
    </>
  );
}

export default App;
