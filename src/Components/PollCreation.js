import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ResponsiveAppBar from "./ResponsiveAppBar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976D2", // Adjust the primary color as needed
    },
  },
  typography: {
    fontFamily: "monospace",
  },
});

const PollCreation = () => {
  const [pollName, setPollName] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const MAX_OPTIONS = 6;

  const handleOptionChange = (index, value) => {
    setOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };

  const addOption = () => {
    if (options.length === MAX_OPTIONS) {
      alert("Only 6 options allowed");
      return;
    }

    setOptions((prev) => [...prev, ""]);
  };

  const deleteOption = (index) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePollNameChange = (e) => {
    setPollName(e.target.value);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async () => {
    if (!pollName || !question || options.some((o) => !o)) {
      alert("All fields, including options, are required");
      return;
    }

    try {
      // Simulate a basic form submission (replace with actual API call)
      const response = await fetch(
        "https://657aaf5e1acd268f9afb9276.mockapi.io/api/v1/polls",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pollName,
            question,
            options,
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        const pollId = responseData.id;

        // Clear the form after submission
        setPollName("");
        setQuestion("");
        setOptions(["", ""]);

        // Show an alert after successful creation with Poll ID
        window.alert(`Poll created successfully! Poll ID: ${pollId}`);
      } else {
        console.error("Failed to create poll.");
        alert("Failed to create poll. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <ResponsiveAppBar />
        <Container>
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              marginBottom: "20px",
              marginTop: "20px", // Added margin-top
            }}
          >
            <Typography
              variant="h4"
              color="primary"
              align="center"
              gutterBottom
            >
              Poll Creation
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  label="Poll Name"
                  variant="outlined"
                  value={pollName}
                  onChange={handlePollNameChange}
                  autoComplete="off" // Disable autocomplete
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  label="Enter your question"
                  variant="outlined"
                  value={question}
                  onChange={handleQuestionChange}
                  autoComplete="off" // Disable autocomplete
                />
              </Grid>
              {options.map((option, index) => (
                <Grid item xs={12} container alignItems="center" key={index}>
                  <Grid item xs={10}>
                    <TextField
                      fullWidth
                      type="text"
                      label={`Option ${index + 1}`}
                      variant="outlined"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      autoComplete="off" // Disable autocomplete
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      onClick={() => deleteOption(index)}
                      color="primary"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12} container justifyContent="flex-end">
                <IconButton onClick={addOption} color="primary">
                  <AddIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12} container justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Create Poll
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </>
    </ThemeProvider>
  );
};

export default PollCreation;
