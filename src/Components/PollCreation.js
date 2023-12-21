import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

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

  // const handleSubmit = async () => {
  //   if (!pollName) {
  //     alert("Poll Name is required");
  //     return;
  //   }

  //   if (!question) {
  //     alert("Question is required");
  //     return;
  //   }

  //   if (options.some((o) => !o)) {
  //     alert("All options are required");
  //     return;
  //   }

  //   // Simulate a basic form submission (replace with actual API call)
  //   try {
  //     const response = await fetch(
  //       "https://657aaf5e1acd268f9afb9276.mockapi.io/api/v1/polls",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           pollName,
  //           question,
  //           options,
  //         }),
  //       }
  //     );

  //     if (response.ok) {
  //       console.log("Poll created successfully!");
  //       // Clear the form after submission
  //       setPollName("");
  //       setQuestion("");
  //       setOptions(["", ""]);

  //       // Show an alert after successful creation
  //       window.alert("Poll created successfully!");
  //     } else {
  //       console.error("Failed to create poll.");
  //       alert("Failed to create poll. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //     alert("An error occurred. Please try again.");
  //   }
  // };
  const handleSubmit = async () => {
    if (!pollName) {
      alert("Poll Name is required");
      return;
    }

    if (!question) {
      alert("Question is required");
      return;
    }

    if (options.some((o) => !o)) {
      alert("All options are required");
      return;
    }

    try {
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
  const monospaceStyle = { fontFamily: "monospace" };

  return (
    <Container>
      <Typography
        variant="h4"
        color="primary"
        align="center"
        gutterBottom
        style={monospaceStyle}
      >
        POLL CREATION BY ARAVINDAN S
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="text"
            label="Poll Name"
            variant="outlined"
            value={pollName}
            onChange={handlePollNameChange}
            style={monospaceStyle}
            autoComplete="off" // Add this line to disable autocomplete
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
            style={monospaceStyle}
            autoComplete="off" // Add this line to disable autocomplete
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
                onChange={(e) => handleOptionChange(index, e.target.value)}
                style={monospaceStyle}
                autoComplete="off" // Add this line to disable autocomplete
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={() => deleteOption(index)} color="primary">
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12} container justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={addOption}
            style={monospaceStyle}
          >
            Add Option
          </Button>
        </Grid>
        <Grid item xs={12} container justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={monospaceStyle}
          >
            Create Poll
          </Button>
          {/* Add Link to VotePage */}
          <Link to={`/vote`} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ ...monospaceStyle, marginLeft: "10px" }}
            >
              Vote Now
            </Button>
          </Link>
          <Link to={`/result`} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ ...monospaceStyle, marginLeft: "10px" }}
            >
              Results
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PollCreation;
