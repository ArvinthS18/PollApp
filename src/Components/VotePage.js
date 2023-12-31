// import ResponsiveAppBar from "./ResponsiveAppBar";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const theme = createTheme({
//   typography: {
//     fontFamily: "'Courier New', monospace",
//   },
//   palette: {
//     primary: {
//       main: "#1976D2",
//     },
//     secondary: {
//       main: "#4CAF50",
//     },
//     text: {
//       primary: "#333",
//     },
//   },
// });

// function App() {
//   const [polls, setPolls] = useState([]);
//   const [selectedOption, setSelectedOption] = useState("");
//   const [filterId, setFilterId] = useState("");
//   const [filteredPoll, setFilteredPoll] = useState(null);
//   const [showVoteCard, setShowVoteCard] = useState(false);
//   const [validationError, setValidationError] = useState("");

//   useEffect(() => {
//     fetch("https://657aaf5e1acd268f9afb9276.mockapi.io/api/v1/polls")
//       .then((response) => response.json())
//       .then((data) => setPolls(data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   const handleFilterChange = (event) => {
//     const input = event.target.value;

//     // Check if the input contains only numbers
//     if (/^\d+$/.test(input) || input === "") {
//       setFilterId(input);
//       setSelectedOption("");
//       setValidationError("");
//       const foundPoll = polls.find((poll) => poll.id === input);
//       setFilteredPoll(foundPoll || null);
//       setShowVoteCard(false);
//     } else {
//       setValidationError("Please enter only numbers.");
//     }
//   };

//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   const handleVoteNow = () => {
//     if (filterId) {
//       const foundPoll = polls.find((poll) => poll.id === filterId);

//       if (foundPoll) {
//         setShowVoteCard(true);
//       } else {
//         toast.error(`Poll with ID ${filterId} does not exist. Cannot vote.`);
//       }
//     } else {
//       toast.error("Please enter a valid ID before voting.");
//     }
//   };

//   const handleVoteSubmit = () => {
//     const foundPoll = polls.find((poll) => poll.id === filterId);

//     if (foundPoll) {
//       const updatedPolls = polls.map((poll) =>
//         poll.id === filterId
//           ? { ...poll, votes: [...poll.votes, selectedOption] }
//           : poll
//       );

//       setPolls(updatedPolls);
//       setSelectedOption("");

//       fetch(
//         `https://657aaf5e1acd268f9afb9276.mockapi.io/api/v1/polls/${filterId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             ...foundPoll,
//             votes: [...foundPoll.votes, selectedOption],
//           }),
//         }
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           console.log("Vote submitted successfully:", data);
//           setFilteredPoll(data);
//           toast.success("You voted! Please reset UI.");
//         })
//         .catch((error) => {
//           console.error("Error submitting vote:", error);
//           toast.error("Error submitting vote. Please try again.");
//         });
//     }

//     setFilterId("");
//     setShowVoteCard(false);
//   };

//   const resetUI = () => {
//     setFilteredPoll(null);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <>
//         <ResponsiveAppBar />
//         <div
//           className="App"
//           style={{
//             textAlign: "center",
//             padding: "20px",
//             backgroundColor: "#f5f5f5",
//             minHeight: "100vh",
//           }}
//         >
//           <Typography
//             variant="h4"
//             color="primary"
//             style={{ marginBottom: "20px" }}
//           >
//             Voting UI
//           </Typography>
//           <Grid container spacing={2} justifyContent="center">
//             <Grid item xs={12} sm={8} md={6}>
//               <TextField
//                 label="Filter by ID"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={filterId}
//                 onChange={handleFilterChange}
//                 placeholder="Enter ID"
//                 autoComplete="off"
//                 style={{ marginBottom: "20px", width: "10cm" }}
//                 error={!!validationError}
//                 helperText={validationError}
//               />
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleVoteNow}
//                 disabled={!filterId}
//                 style={{ marginBottom: "20px", marginLeft: "10px" }}
//               >
//                 Vote Now
//               </Button>

//               {showVoteCard && filteredPoll !== null && (
//                 <Card variant="outlined" style={{ height: "400px" }}>
//                   <CardContent>
//                     <Typography variant="h5" color="primary" gutterBottom>
//                       {filteredPoll.pollName}
//                     </Typography>
//                     <Typography color="textPrimary" paragraph>
//                       {filteredPoll.question}
//                     </Typography>
//                     <FormControl component="fieldset">
//                       <RadioGroup
//                         value={selectedOption}
//                         onChange={handleOptionChange}
//                       >
//                         {filteredPoll.options.map((option, index) => (
//                           <FormControlLabel
//                             key={index}
//                             value={option}
//                             control={<Radio color="primary" />}
//                             label={option}
//                           />
//                         ))}
//                       </RadioGroup>
//                     </FormControl>
//                     <Typography
//                       style={{
//                         marginTop: "20px",
//                         color: selectedOption
//                           ? "red"
//                           : theme.palette.text.primary,
//                       }}
//                     >
//                       Selected Option: {selectedOption}
//                     </Typography>
//                   </CardContent>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "center",
//                       marginTop: "20px",
//                     }}
//                   >
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={handleVoteSubmit}
//                       disabled={!selectedOption}
//                       style={{ marginRight: "10px" }}
//                     >
//                       Submit Vote
//                     </Button>
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       onClick={resetUI}
//                     >
//                       Reset UI
//                     </Button>
//                   </div>
//                 </Card>
//               )}
//             </Grid>
//           </Grid>
//         </div>
//         <ToastContainer />
//       </>
//     </ThemeProvider>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  createTheme,
  ThemeProvider,
  Grid,
  Paper,
} from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme({
  typography: {
    fontFamily: "'Courier New', monospace",
  },
  palette: {
    primary: {
      main: "#1976D2",
    },
    secondary: {
      main: "#4CAF50",
    },
    text: {
      primary: "#333",
    },
  },
});

function App() {
  const [polls, setPolls] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [filterId, setFilterId] = useState("");
  const [filteredPoll, setFilteredPoll] = useState(null);
  const [showVoteCard, setShowVoteCard] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    fetch("https://657aaf5e1acd268f9afb9276.mockapi.io/api/v1/polls")
      .then((response) => response.json())
      .then((data) => setPolls(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleFilterChange = (event) => {
    const input = event.target.value;

    // Check if the input contains only numbers
    if (/^\d+$/.test(input) || input === "") {
      setFilterId(input);
      setSelectedOption("");
      setValidationError("");
      const foundPoll = polls.find((poll) => poll.id === input);
      setFilteredPoll(foundPoll || null);
      setShowVoteCard(false);
    } else {
      setValidationError("Please enter only numbers.");
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleVoteNow = () => {
    if (filterId) {
      const foundPoll = polls.find((poll) => poll.id === filterId);

      if (foundPoll) {
        setShowVoteCard(true);
      } else {
        toast.error(`Poll with ID ${filterId} does not exist. Cannot vote.`);
      }
    } else {
      toast.error("Please enter a valid ID before voting.");
    }
  };

  const handleVoteSubmit = () => {
    const foundPoll = polls.find((poll) => poll.id === filterId);

    if (foundPoll) {
      const updatedPolls = polls.map((poll) =>
        poll.id === filterId
          ? { ...poll, votes: [...poll.votes, selectedOption] }
          : poll
      );

      setPolls(updatedPolls);
      setSelectedOption("");

      fetch(
        `https://657aaf5e1acd268f9afb9276.mockapi.io/api/v1/polls/${filterId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...foundPoll,
            votes: [...foundPoll.votes, selectedOption],
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Vote submitted successfully:", data);
          setFilteredPoll(data);
          toast.success("You voted! Please reset UI.");
        })
        .catch((error) => {
          console.error("Error submitting vote:", error);
          toast.error("Error submitting vote. Please try again.");
        });
    }

    setFilterId("");
    setShowVoteCard(false);
  };

  const resetUI = () => {
    setFilteredPoll(null);
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
          <Typography
            variant="h4"
            color="primary"
            style={{ marginBottom: "20px" }}
          >
            Professional Voting UI
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
              <Paper
                elevation={3}
                style={{ padding: "20px", borderRadius: "10px" }}
              >
                <TextField
                  label="Filter by ID"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={filterId}
                  onChange={handleFilterChange}
                  placeholder="Enter ID"
                  autoComplete="off"
                  style={{ marginBottom: "10px" }}
                  error={!!validationError}
                  helperText={validationError}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleVoteNow}
                  disabled={!filterId}
                  style={{ marginBottom: "20px" }}
                >
                  Vote Now
                </Button>

                {showVoteCard && filteredPoll !== null && (
                  <Card variant="outlined" style={{ height: "400px" }}>
                    <CardContent>
                      <Typography variant="h5" color="primary" gutterBottom>
                        {filteredPoll.pollName}
                      </Typography>
                      <Typography color="textPrimary" paragraph>
                        {filteredPoll.question}
                      </Typography>
                      <FormControl component="fieldset">
                        <RadioGroup
                          value={selectedOption}
                          onChange={handleOptionChange}
                        >
                          {filteredPoll.options.map((option, index) => (
                            <FormControlLabel
                              key={index}
                              value={option}
                              control={<Radio color="primary" />}
                              label={option}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <Typography
                        style={{
                          marginTop: "20px",
                          color: selectedOption
                            ? "red"
                            : theme.palette.text.primary,
                        }}
                      >
                        Selected Option: {selectedOption}
                      </Typography>
                    </CardContent>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleVoteSubmit}
                        disabled={!selectedOption}
                        style={{ marginRight: "10px" }}
                      >
                        Submit Vote
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={resetUI}
                      >
                        Reset UI
                      </Button>
                    </div>
                  </Card>
                )}
              </Paper>
            </Grid>
          </Grid>
        </div>
        <ToastContainer />
      </>
    </ThemeProvider>
  );
}

export default App;
