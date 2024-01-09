// import React, { useState } from "react";
// import {
//   Container,
//   TextField,
//   Button,
//   Grid,
//   Typography,
//   IconButton,
//   Paper,
//   FormHelperText,
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
//   const MAX_POLL_NAME_LENGTH = 40;
//   const MAX_QUESTION_LENGTH = 100;
//   const MAX_OPTION_LENGTH = 100;
//   const MAX_OPTIONS = 6;

//   const [pollName, setPollName] = useState("");
//   const [question, setQuestion] = useState("");
//   const [options, setOptions] = useState(["", ""]);

//   const [pollNameError, setPollNameError] = useState(false);
//   const [questionError, setQuestionError] = useState(false);
//   const [optionsError, setOptionsError] = useState([]);

//   const handleOptionChange = (index, value) => {
//     if (value.length <= MAX_OPTION_LENGTH) {
//       setOptions((prevOptions) => {
//         const updatedOptions = [...prevOptions];
//         updatedOptions[index] = value;
//         return updatedOptions;
//       });

//       // Clear the error if it was previously set
//       if (optionsError[index]) {
//         setOptionsError((prev) => {
//           const updatedOptionsError = [...prev];
//           updatedOptionsError[index] = false;
//           return updatedOptionsError;
//         });
//       }
//     } else {
//       toast.warning(
//         `Option ${
//           index + 1
//         } should be less than or equal to ${MAX_OPTION_LENGTH} characters`
//       );

//       // Set the error state for this option
//       setOptionsError((prev) => {
//         const updatedOptionsError = [...prev];
//         updatedOptionsError[index] = true;
//         return updatedOptionsError;
//       });
//     }
//   };

//   const addOption = () => {
//     if (options.length === MAX_OPTIONS) {
//       toast.warning("Only 6 options allowed");
//       return;
//     }

//     setOptions((prev) => [...prev, ""]);
//     setOptionsError((prev) => [...prev, false]); // Add an error state for the new option
//   };

//   const deleteOption = (index) => {
//     setOptions((prev) => prev.filter((_, i) => i !== index));
//     setOptionsError((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handlePollNameChange = (e) => {
//     const value = e.target.value.trim();
//     if (value.length <= MAX_POLL_NAME_LENGTH) {
//       setPollName(value);

//       // Clear the error if it was previously set
//       if (pollNameError) {
//         setPollNameError(false);
//       }
//     } else {
//       toast.warning(
//         `Poll Name should be less than or equal to ${MAX_POLL_NAME_LENGTH} characters`
//       );

//       // Set the error state for pollName
//       setPollNameError(true);
//     }
//   };

//   const handleQuestionChange = (e) => {
//     const value = e.target.value.trim();
//     if (value.length <= MAX_QUESTION_LENGTH) {
//       setQuestion(value);

//       // Clear the error if it was previously set
//       if (questionError) {
//         setQuestionError(false);
//       }
//     } else {
//       toast.warning(
//         `Question should be less than or equal to ${MAX_QUESTION_LENGTH} characters`
//       );

//       // Set the error state for question
//       setQuestionError(true);
//     }
//   };

//   const isOptionsValid = () => {
//     return options.every(
//       (option) => option.trim() !== "" && option.length <= MAX_OPTION_LENGTH
//     );
//   };

//   const isFormValid = () => {
//     return pollName.trim() !== "" && question.trim() !== "" && isOptionsValid();
//   };

//   const handleSubmit = async () => {
//     if (!isFormValid()) {
//       toast.error("All fields are required");
//       return;
//     }

//     try {
//       // Simulate a basic form submission (replace with actual API call)
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
//         setOptions(["", ""]);

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
//         <Container>
//           <Paper
//             elevation={3}
//             style={{
//               padding: "20px",
//               marginBottom: "20px",
//               marginTop: "20px",
//             }}
//           >
//             <Typography
//               variant="h4"
//               color="primary"
//               align="center"
//               gutterBottom
//             >
//               Poll Creation
//             </Typography>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   type="text"
//                   label="Poll Name"
//                   variant="outlined"
//                   value={pollName}
//                   onChange={handlePollNameChange}
//                   autoComplete="off"
//                   error={pollNameError}
//                 />
//                 {pollNameError && (
//                   <FormHelperText style={{ color: "red" }}>
//                     {`Max ${MAX_POLL_NAME_LENGTH} characters`}
//                   </FormHelperText>
//                 )}
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
//                   error={questionError}
//                 />
//                 {questionError && (
//                   <FormHelperText style={{ color: "red" }}>
//                     {`Max ${MAX_QUESTION_LENGTH} characters`}
//                   </FormHelperText>
//                 )}
//               </Grid>
//               {options.map((option, index) => (
//                 <Grid item xs={12} container alignItems="center" key={index}>
//                   <Grid item xs={10}>
//                     <TextField
//                       fullWidth
//                       type="text"
//                       label={`Option ${index + 1}`}
//                       variant="outlined"
//                       value={option}
//                       onChange={(e) =>
//                         handleOptionChange(index, e.target.value)
//                       }
//                       autoComplete="off"
//                       error={optionsError[index]}
//                     />
//                     {optionsError[index] && (
//                       <FormHelperText style={{ color: "red" }}>
//                         {`Max ${MAX_OPTION_LENGTH} characters`}
//                       </FormHelperText>
//                     )}
//                   </Grid>
//                   <Grid item xs={2}>
//                     <IconButton
//                       onClick={() => deleteOption(index)}
//                       color="primary"
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </Grid>
//                 </Grid>
//               ))}
//               <Grid item xs={12} container justifyContent="flex-end">
//                 <IconButton onClick={addOption} color="primary">
//                   <AddIcon />
//                 </IconButton>
//               </Grid>
//               <Grid item xs={12} container justifyContent="flex-end">
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   // onClick={handleSubmit}
//                   disabled={!isFormValid()} // Disable button when the form is not valid
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
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Paper,
  FormHelperText,
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
  const MAX_POLL_NAME_LENGTH = 40;
  const MAX_QUESTION_LENGTH = 100;
  const MAX_OPTION_LENGTH = 100;
  const MAX_OPTIONS = 6;

  const [pollName, setPollName] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const [pollNameError, setPollNameError] = useState(false);
  const [questionError, setQuestionError] = useState(false);
  const [optionsError, setOptionsError] = useState([]);

  const handleOptionChange = (index, value) => {
    if (value.length <= MAX_OPTION_LENGTH) {
      setOptions((prevOptions) => {
        const updatedOptions = [...prevOptions];
        updatedOptions[index] = value;
        return updatedOptions;
      });

      // Clear the error if it was previously set
      if (optionsError[index]) {
        setOptionsError((prev) => {
          const updatedOptionsError = [...prev];
          updatedOptionsError[index] = false;
          return updatedOptionsError;
        });
      }
    } else {
      toast.warning(
        `Option ${
          index + 1
        } should be less than or equal to ${MAX_OPTION_LENGTH} characters`
      );

      // Set the error state for this option
      setOptionsError((prev) => {
        const updatedOptionsError = [...prev];
        updatedOptionsError[index] = true;
        return updatedOptionsError;
      });
    }
  };

  const addOption = () => {
    if (options.length === MAX_OPTIONS) {
      toast.warning("Only 6 options allowed");
      return;
    }

    setOptions((prev) => [...prev, ""]);
    setOptionsError((prev) => [...prev, false]); // Add an error state for the new option
  };

  const deleteOption = (index) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
    setOptionsError((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePollNameChange = (e) => {
    const value = e.target.value.trim();
    if (value.length <= MAX_POLL_NAME_LENGTH) {
      setPollName(value);

      // Clear the error if it was previously set
      if (pollNameError) {
        setPollNameError(false);
      }
    } else {
      toast.warning(
        `Poll Name should be less than or equal to ${MAX_POLL_NAME_LENGTH} characters`
      );

      // Set the error state for pollName
      setPollNameError(true);
    }
  };

  const handleQuestionChange = (e) => {
    const value = e.target.value.trim();
    if (value.length <= MAX_QUESTION_LENGTH) {
      setQuestion(value);

      // Clear the error if it was previously set
      if (questionError) {
        setQuestionError(false);
      }
    } else {
      toast.warning(
        `Question should be less than or equal to ${MAX_QUESTION_LENGTH} characters`
      );

      // Set the error state for question
      setQuestionError(true);
    }
  };

  const isOptionsValid = () => {
    return options.every(
      (option) => option.trim() !== "" && option.length <= MAX_OPTION_LENGTH
    );
  };

  const isFormValid = () => {
    return pollName.trim() !== "" && question.trim() !== "" && isOptionsValid();
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      toast.error("All fields are required");
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

        // Show a toast message after successful creation with Poll ID
        toast.success(`Poll created successfully! Poll ID: ${pollId}`);
      } else {
        console.error("Failed to create poll.");
        // Show a toast message for failure
        toast.error("Failed to create poll. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Show a toast message for error
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <ResponsiveAppBar />

        <div
          className="App"
          style={{
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#f5f5f5",
            minHeight: "100vh",
          }}
        >
          <Typography variant="h4" color="primary" align="center" gutterBottom>
            Poll Creation
          </Typography>
          <Card
            elevation={3}
            style={{
              maxWidth: "1200px", // Adjust the max width to your preference
              margin: "0 auto", // Center the card
              padding: "20px",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            <br></br>
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
                  error={pollNameError}
                />
                {pollNameError && (
                  <FormHelperText style={{ color: "red" }}>
                    {`Max ${MAX_POLL_NAME_LENGTH} characters`}
                  </FormHelperText>
                )}
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
                  error={questionError}
                />
                {questionError && (
                  <FormHelperText style={{ color: "red" }}>
                    {`Max ${MAX_QUESTION_LENGTH} characters`}
                  </FormHelperText>
                )}
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
                      autoComplete="off"
                      error={optionsError[index]}
                    />
                    {optionsError[index] && (
                      <FormHelperText style={{ color: "red" }}>
                        {`Max ${MAX_OPTION_LENGTH} characters`}
                      </FormHelperText>
                    )}
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
                  disabled={!isFormValid()}
                >
                  Create Poll
                </Button>
              </Grid>
            </Grid>
          </Card>
          <ToastContainer position="top-right" autoClose={5000} />
        </div>
      </>
    </ThemeProvider>
  );
};

export default PollCreation;
