// import React, { useState } from "react";
// import {
//   Container,
//   TextField,
//   Button,
//   Grid,
//   Typography,
//   IconButton,
//   Paper,
//   Tooltip,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import ResponsiveAppBar from "./ResponsiveAppBar";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#1976D2", // Adjust the primary color as needed
//     },
//   },
//   typography: {
//     fontFamily: "monospace",
//   },
// });

// const PollCreation = () => {
//   const [pollName, setPollName] = useState("");
//   const [question, setQuestion] = useState("");
//   const [options, setOptions] = useState(["", "Nota"]);
//   const MAX_OPTIONS = 6;
//   const MIN_OPTIONS = 2;

//   const handleOptionChange = (index, value) => {
//     setOptions((prevOptions) => {
//       const updatedOptions = [...prevOptions];
//       updatedOptions[index] = value;
//       return updatedOptions;
//     });
//   };

//   const addOption = () => {
//     if (options.length === MAX_OPTIONS) {
//       toast.warning("Only 6 options allowed");
//       return;
//     }

//     setOptions((prev) => [...prev, ""]);
//   };

//   const deleteOption = (index) => {
//     if (options.length > MIN_OPTIONS) {
//       setOptions((prev) => prev.filter((_, i) => i !== index));
//     } else {
//       toast.warning("At least two options are required");
//     }
//   };

//   const handlePollNameChange = (e) => {
//     const value = e.target.value;
//     if (value.length <= 40) {
//       setPollName(value);
//     } else {
//       setPollName(value.substring(0, 40));
//       toast.warning("Maximum 40 characters allowed for Poll Name");
//     }
//   };

//   const handleQuestionChange = (e) => {
//     const value = e.target.value;
//     if (value.length <= 100) {
//       setQuestion(value);
//     } else {
//       setQuestion(value.substring(0, 100));
//       toast.warning("Maximum 100 characters allowed for Question");
//     }
//   };

//   // Function to check if all required fields are filled
//   const areFieldsFilled = () => {
//     return (
//       pollName.trim() !== "" &&
//       question.trim() !== "" &&
//       options.every((o) => o.trim() !== "")
//     );
//   };

//   const handleSubmit = async () => {
//     if (!areFieldsFilled()) {
//       toast.error("All fields, including options, are required");
//       return;
//     }

//     try {
//       // Simulate a basic form submission (replace with an actual API call)
//       const response = await fetch(
//         "https://657aaf5e1acd268f9afb9276.mockapi.io/api/v1/polls",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             pollName,
//             question,
//             options,
//           }),
//         }
//       );

//       if (response.ok) {
//         const responseData = await response.json();
//         const pollId = responseData.id;

//         // Clear the form after submission
//         setPollName("");
//         setQuestion("");
//         setOptions(["", "Nota"]);

//         // Show a toast message after successful creation with Poll ID
//         toast.success(`Poll created successfully! Poll ID: ${pollId}`);
//       } else {
//         console.error("Failed to create poll.");
//         // Show a toast message for failure
//         toast.error("Failed to create poll. Please try again.");
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//       // Show a toast message for error
//       toast.error("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <>
//         <ResponsiveAppBar />
//         <br />
//         <Typography variant="h4" color="primary" align="center" gutterBottom>
//           Poll Creation
//         </Typography>
//         <Container>
//           <Paper
//             elevation={4}
//             style={{
//               padding: "20px",
//               marginBottom: "20px",
//               marginTop: "20px",
//             }}
//           >
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <br />
//                 <TextField
//                   fullWidth
//                   type="text"
//                   label="Poll Name"
//                   variant="outlined"
//                   value={pollName}
//                   onChange={handlePollNameChange}
//                   autoComplete="off"
//                   error={pollName.length === 40}
//                   helperText={
//                     pollName.length === 40
//                       ? "Maximum 40 characters allowed for Poll Name"
//                       : ""
//                   }
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   type="text"
//                   label="Enter your question"
//                   variant="outlined"
//                   value={question}
//                   onChange={handleQuestionChange}
//                   autoComplete="off"
//                   error={question.length === 100}
//                   helperText={
//                     question.length === 100
//                       ? "Maximum 100 characters allowed for Question"
//                       : ""
//                   }
//                 />
//               </Grid>
//               {options.map((option, index) => (
//                 <Grid item xs={12} container alignItems="center" key={index}>
//                   <Grid item xs={10}>
//                     {index === 1 ? (
//                       <TextField
//                         fullWidth
//                         type="text"
//                         label={`Option ${index + 1}`}
//                         variant="outlined"
//                         value={option}
//                         InputProps={{ readOnly: true }}
//                       />
//                     ) : (
//                       <TextField
//                         fullWidth
//                         type="text"
//                         label={`Option ${index + 1}`}
//                         variant="outlined"
//                         value={option}
//                         onChange={(e) =>
//                           handleOptionChange(index, e.target.value)
//                         }
//                         autoComplete="off"
//                         error={option.length === 100}
//                         helperText={
//                           option.length === 100
//                             ? `Maximum 100 characters allowed for Option ${
//                                 index + 1
//                               }`
//                             : ""
//                         }
//                       />
//                     )}
//                   </Grid>
//                   {index >= MIN_OPTIONS && (
//                     <Grid item xs={2}>
//                       <IconButton
//                         onClick={() => deleteOption(index)}
//                         color="primary"
//                         aria-label={`Delete Option ${index + 1}`}
//                       >
//                         <Tooltip title={`Delete Option ${index + 1}`}>
//                           <DeleteIcon />
//                         </Tooltip>
//                       </IconButton>
//                     </Grid>
//                   )}
//                 </Grid>
//               ))}
//               <Grid item xs={12} container justifyContent="flex-end">
//                 <Tooltip title="Add Option">
//                   <IconButton onClick={addOption} color="primary">
//                     <AddIcon />
//                   </IconButton>
//                 </Tooltip>
//               </Grid>
//               <Grid item xs={12} container justifyContent="flex-end">
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleSubmit}
//                   disabled={!areFieldsFilled()}
//                 >
//                   Create Poll
//                 </Button>
//               </Grid>
//             </Grid>
//           </Paper>
//         </Container>
//         <ToastContainer position="top-right" autoClose={5000} />
//       </>
//     </ThemeProvider>
//   );
// };

// export default PollCreation;
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Paper,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976D2",
    },
  },
  typography: {
    fontFamily: "monospace",
  },
});

const PollCreation = () => {
  const [pollName, setPollName] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "Nota"]);
  const MAX_OPTIONS = 6;
  const MIN_OPTIONS = 2;

  const handleOptionChange = (index, value) => {
    setOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };

  const addOption = () => {
    if (options.length === MAX_OPTIONS) {
      toast.warning("Only 6 options allowed");
      return;
    }

    setOptions((prev) => [...prev, ""]);
  };

  const deleteOption = (index) => {
    if (options.length > MIN_OPTIONS) {
      setOptions((prev) => prev.filter((_, i) => i !== index));
    } else {
      toast.warning("At least two options are required");
    }
  };

  const handlePollNameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 40) {
      setPollName(value);
    } else {
      setPollName(value.substring(0, 40));
      toast.warning("Maximum 40 characters allowed for Poll Name");
    }
  };

  const handleQuestionChange = (e) => {
    const value = e.target.value;
    if (value.length <= 100) {
      setQuestion(value);
    } else {
      setQuestion(value.substring(0, 100));
      toast.warning("Maximum 100 characters allowed for Question");
    }
  };

  const areFieldsFilled = () => {
    return (
      pollName.trim() !== "" &&
      question.trim() !== "" &&
      options.every((o) => o.trim() !== "")
    );
  };

  const handleSubmit = async () => {
    if (!areFieldsFilled()) {
      toast.error("All fields, including options, are required");
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

        setPollName("");
        setQuestion("");
        setOptions(["", "Nota"]);

        toast.success(`Poll created successfully! Poll ID: ${pollId}`);
      } else {
        console.error("Failed to create poll.");
        toast.error("Failed to create poll. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <ResponsiveAppBar />
        <br />
        <Typography variant="h4" color="primary" align="center" gutterBottom>
          Poll Creation
        </Typography>
        <Container>
          <Paper
            elevation={4}
            style={{
              padding: "20px",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  label="Poll Name"
                  variant="outlined"
                  value={pollName}
                  onChange={handlePollNameChange}
                  autoComplete="off"
                  error={pollName.length === 40}
                  helperText={
                    pollName.length === 40
                      ? "Maximum 40 characters allowed for Poll Name"
                      : ""
                  }
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
                  autoComplete="off"
                  error={question.length === 100}
                  helperText={
                    question.length === 100
                      ? "Maximum 100 characters allowed for Question"
                      : ""
                  }
                />
              </Grid>
              {options.map((option, index) => (
                <Grid item xs={12} container alignItems="center" key={index}>
                  <Grid item xs={10}>
                    {index === 1 ? (
                      <TextField
                        fullWidth
                        type="text"
                        label={`Option ${index + 1}`}
                        variant="outlined"
                        value={option}
                        InputProps={{ readOnly: true }}
                        style={{ backgroundColor: "#f0f0f0", borderRadius: 4 }}
                      />
                    ) : (
                      <TextField
                        fullWidth
                        type="text"
                        label={`Option ${index + 1}`}
                        variant="outlined"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(index, e.target.value)
                        }
                        autoComplete="off"
                        error={option.length === 100}
                        helperText={
                          option.length === 100
                            ? `Maximum 100 characters allowed for Option ${
                                index + 1
                              }`
                            : ""
                        }
                      />
                    )}
                  </Grid>
                  {index >= MIN_OPTIONS && (
                    <Grid item xs={2}>
                      <IconButton
                        onClick={() => deleteOption(index)}
                        color="primary"
                        aria-label={`Delete Option ${index + 1}`}
                      >
                        <Tooltip title={`Delete Option ${index + 1}`}>
                          <DeleteIcon />
                        </Tooltip>
                      </IconButton>
                    </Grid>
                  )}
                </Grid>
              ))}
              <Grid item xs={12} container justifyContent="flex-end">
                <Tooltip title="Add Option">
                  <IconButton onClick={addOption} color="primary">
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={12} container justifyContent="flex-end">
                <Tooltip title="Create Poll">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!areFieldsFilled()}
                  >
                    Create Poll
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Paper>
        </Container>
        <ToastContainer position="top-right" autoClose={5000} />
      </>
    </ThemeProvider>
  );
};

export default PollCreation;
