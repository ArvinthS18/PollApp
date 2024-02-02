// import React, { useState, useEffect } from "react";
// import {
//   TextField,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Typography,
//   Paper,
//   Button,
//   createTheme,
//   ThemeProvider,
//   Box,
//   Container,
//   Grid,
// } from "@mui/material";
// import ResponsiveAppBar from "./ResponsiveAppBar";
// import StarIcon from "@mui/icons-material/Star";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Modal from "./Modal";

// const theme = createTheme({
//   typography: {
//     fontFamily: "'Courier New', monospace",
//     heading: {
//       color: "#1976D2",
//     },
//   },
//   palette: {
//     primary: {
//       main: "#1976D2",
//     },
//     secondary: {
//       main: "#4CAF50",
//     },
//     red: {
//       main: "#FF0000",
//     },
//   },
// });

// function App() {
//   const [polls, setPolls] = useState([]);
//   const [filterId, setFilterId] = useState("");
//   const [leader, setLeader] = useState(null);
//   const [filteredPoll, setFilteredPoll] = useState(null);
//   const [validationError, setValidationError] = useState("");
//   const [sessionExpiration, setSessionExpiration] = useState(null);
//   const [timer, setTimer] = useState(0);

//   const [showWelcomeModal, setShowWelcomeModal] = useState(true);
//   const [showGuidelinesModal, setShowGuidelinesModal] = useState(false);

//   const handleCloseWelcomeModal = () => {
//     setShowWelcomeModal(false);
//     setShowGuidelinesModal(true);
//   };

//   const handleCloseGuidelinesModal = () => {
//     setShowGuidelinesModal(false);
//   };

//   useEffect(() => {
//     fetch("https://657aaf5e1acd268f9afb9276.mockapi.io/api/v1/polls")
//       .then((response) => response.json())
//       .then((data) => setPolls(data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   useEffect(() => {
//     let countdownTimer;

//     const handleSessionExpiration = () => {
//       clearInterval(countdownTimer);
//       toast.error(
//         "Your session has expired. Please re-enter the ID to get the result."
//       );
//       setSessionExpiration(null);
//       setTimer(0);
//       setFilteredPoll(null);
//       setLeader(null);
//       setFilterId("");
//     };

//     if (sessionExpiration) {
//       countdownTimer = setInterval(() => {
//         const secondsRemaining = Math.ceil(
//           (sessionExpiration - new Date()) / 1000
//         );
//         setTimer((prev) => (prev > 0 ? secondsRemaining : prev));

//         if (secondsRemaining <= 0) {
//           handleSessionExpiration();
//         }
//       }, 1000);
//     }

//     return () => {
//       clearInterval(countdownTimer);
//     };
//   }, [sessionExpiration]);

//   const handleFilterChange = (event) => {
//     setFilterId(event.target.value);
//     setValidationError("");
//   };

//   const handleGetResult = () => {
//     if (!filterId || !/^[0-9]*$/.test(filterId)) {
//       setValidationError("Please enter a valid ID containing only numbers.");
//       toast.error("Please enter a valid ID containing only numbers.");
//       return;
//     }

//     const foundPoll = polls.find((poll) => poll.id === filterId);
//     if (foundPoll) {
//       setFilteredPoll(foundPoll);

//       const voteCounts = foundPoll.votes.reduce((acc, option) => {
//         acc[option] = (acc[option] || 0) + 1;
//         return acc;
//       }, {});

//       const sortedVoteCounts = Object.entries(voteCounts).sort(
//         ([, countA], [, countB]) => countB - countA
//       );

//       if (sortedVoteCounts.length > 0) {
//         const [firstOption, secondOption] = sortedVoteCounts;

//         const margin = secondOption
//           ? firstOption[1] - secondOption[1]
//           : firstOption[1];

//         const leaders = sortedVoteCounts
//           .filter(([, count]) => count === firstOption[1])
//           .map(([option]) => option);

//         setLeader({
//           leaders: leaders.join(", "),
//           margin:
//             margin > 0
//               ? `Lead by ${margin} vote${margin !== 1 ? "s" : ""}`
//               : "Tied",
//         });

//         const expirationTime = new Date();
//         expirationTime.setSeconds(expirationTime.getSeconds() + 60);
//         setSessionExpiration(expirationTime);
//         setTimer(60);

//         toast.success("Poll result retrieved successfully!");
//       } else {
//         setLeader(null);
//         toast.error("No votes found for the entered ID.");
//       }
//     } else {
//       setFilteredPoll(null);
//       setLeader(null);
//       toast.error("Poll not found for the entered ID.");
//     }
//   };

//   const formatTimeRemaining = () => {
//     if (timer <= 0) return "";
//     const minutes = Math.floor(timer / 60);
//     const seconds = timer % 60;

//     return `Expires in ${minutes}:${seconds < 10 ? "0" : ""}${seconds} seconds`;
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <>
//         <ResponsiveAppBar theme={theme} />
//         <Container>
//           <Box
//             sx={{
//               padding: "20px",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Typography
//               variant="h4"
//               sx={{
//                 color: theme.typography.heading.color,
//                 marginBottom: "20px",
//               }}
//             >
//               Polls Data
//             </Typography>

//             <TextField
//               label="Filter by ID"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//               value={filterId}
//               onChange={handleFilterChange}
//               placeholder="Enter ID"
//               autoComplete="off"
//               error={Boolean(validationError)}
//               helperText={validationError}
//               style={{ marginBottom: "50px", width: "10cm" }}
//             />

//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleGetResult}
//               style={{ marginBottom: "20px" }}
//             >
//               Get Result
//             </Button>

//             {filteredPoll && (
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={6}>
//                   <Paper elevation={3} sx={{ padding: "15px" }}>
//                     <Typography variant="h6" sx={{ marginBottom: "10px" }}>
//                       <b>Poll Details</b>
//                     </Typography>
//                     <Typography variant="body1">
//                       <strong>ID:</strong> {filteredPoll.id}
//                     </Typography>
//                     <Typography variant="body1">
//                       <strong>Poll Name:</strong> {filteredPoll.pollName}
//                     </Typography>
//                     <Typography variant="body1">
//                       <strong>Question:</strong> {filteredPoll.question}
//                     </Typography>
//                     <Typography variant="body1">
//                       <strong>Options:</strong>{" "}
//                       {filteredPoll.options
//                         .map(
//                           (option) =>
//                             `${option} (${
//                               filteredPoll.votes.filter(
//                                 (vote) => vote === option
//                               ).length
//                             } votes)`
//                         )
//                         .join(", ")}
//                     </Typography>
//                     <Typography variant="body1">
//                       <strong>Total Votes:</strong> {filteredPoll.votes.length}
//                     </Typography>
//                     <Typography variant="body1">
//                       <strong>Margin:</strong> {leader?.margin}
//                     </Typography>
//                   </Paper>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <Paper elevation={3} sx={{ padding: "15px" }}>
//                     <Typography variant="h6" sx={{ marginBottom: "10px" }}>
//                       <b>Votes</b>
//                     </Typography>
//                     <Table>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell>ID</TableCell>
//                           <TableCell>Votes</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         <TableRow key={filteredPoll.id}>
//                           <TableCell>{filteredPoll.id}</TableCell>
//                           <TableCell>{filteredPoll.votes.join(", ")}</TableCell>
//                         </TableRow>
//                       </TableBody>
//                     </Table>
//                   </Paper>
//                 </Grid>
//               </Grid>
//             )}
//             {leader && (
//               <Paper
//                 elevation={3}
//                 sx={{ padding: "15px", marginTop: "20px", textAlign: "center" }}
//               >
//                 <Typography variant="h6">
//                   <b>Leader</b>(WON)
//                 </Typography>
//                 <StarIcon color="secondary" sx={{ fontSize: 40 }} />
//                 <Typography variant="body1">{leader.leaders}</Typography>
//               </Paper>
//             )}

//             {timer > 0 && (
//               <Typography
//                 variant="body2"
//                 sx={{
//                   marginTop: "20px",
//                   color: theme.palette.primary.main,
//                   position: "fixed",
//                   bottom: "20px",
//                   right: "20px",
//                 }}
//               >
//                 {formatTimeRemaining()}
//               </Typography>
//             )}

//             <ToastContainer position="top-right" autoClose={3000} />
//           </Box>
//         </Container>

//         {/* Welcome Modal */}
//         {/* <Modal
//           open={showWelcomeModal}
//           onClose={handleCloseWelcomeModal}
//           title="Welcome to the Polls App"
//         > */}
//           {/* Enter your Poll ID to get started. */}
//           {/* To view the poll result, enter the Poll ID and click the "Get Result"
//           button.
//         </Modal> */}

//         {/* Guidelines Modal */}
//         {/* <Modal
//           open={showGuidelinesModal}
//           onClose={handleCloseGuidelinesModal}
//           title="Guidelines"
//         >
//           The session will expire after one minute. Follow these guidelines for
//           a better experience.
//         </Modal> */}
//       </>
//     </ThemeProvider>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import {
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Paper,
  Button,
  createTheme,
  ThemeProvider,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";
import StarIcon from "@mui/icons-material/Star";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./Modal";

const theme = createTheme({
  typography: {
    fontFamily: "'Courier New', monospace",
    heading: {
      color: "#1976D2",
    },
    
  },
  palette: {
    primary: {
      main: "#1976D2",
    },
    secondary: {
      main: "#4CAF50",
    },
    red: {
      main: "#FF0000",
    },
  },
});

function App() {
  const [polls, setPolls] = useState([]);
  const [filterId, setFilterId] = useState("");
  const [leader, setLeader] = useState(null);
  const [filteredPoll, setFilteredPoll] = useState(null);
  const [validationError, setValidationError] = useState("");
  const [sessionExpiration, setSessionExpiration] = useState(null);
  const [timer, setTimer] = useState(0);

  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [showGuidelinesModal, setShowGuidelinesModal] = useState(false);

  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
    setShowGuidelinesModal(true);
  };

  const handleCloseGuidelinesModal = () => {
    setShowGuidelinesModal(false);
  };

  useEffect(() => {
    fetch("https://657aaf5e1acd268f9afb9276.mockapi.io/api/v1/polls")
      .then((response) => response.json())
      .then((data) => setPolls(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    let countdownTimer;

    const handleSessionExpiration = () => {
      clearInterval(countdownTimer);
      toast.error(
        "Your session has expired. Please re-enter the ID to get the result."
      );
      setSessionExpiration(null);
      setTimer(0);
      setFilteredPoll(null);
      setLeader(null);
      setFilterId("");
    };

    if (sessionExpiration) {
      countdownTimer = setInterval(() => {
        const secondsRemaining = Math.ceil(
          (sessionExpiration - new Date()) / 1000
        );
        setTimer((prev) => (prev > 0 ? secondsRemaining : prev));

        if (secondsRemaining <= 0) {
          handleSessionExpiration();
        }
      }, 1000);
    }

    return () => {
      clearInterval(countdownTimer);
    };
  }, [sessionExpiration]);

  const handleFilterChange = (event) => {
    setFilterId(event.target.value);
    setValidationError("");
  };

  const handleGetResult = () => {
    if (!filterId || !/^[0-9]*$/.test(filterId)) {
      setValidationError("Please enter a valid ID containing only numbers.");
      toast.error("Please enter a valid ID containing only numbers.");
      return;
    }

    const foundPoll = polls.find((poll) => poll.id === filterId);
    if (foundPoll) {
      setFilteredPoll(foundPoll);

      const voteCounts = foundPoll.votes.reduce((acc, option) => {
        acc[option] = (acc[option] || 0) + 1;
        return acc;
      }, {});

      const sortedVoteCounts = Object.entries(voteCounts).sort(
        ([, countA], [, countB]) => countB - countA
      );

      if (sortedVoteCounts.length > 0) {
        const [firstOption, secondOption] = sortedVoteCounts;

        const margin = secondOption
          ? firstOption[1] - secondOption[1]
          : firstOption[1];

        const leaders = sortedVoteCounts
          .filter(([, count]) => count === firstOption[1])
          .map(([option]) => option);

        setLeader({
          leaders: leaders.join(", "),
          margin:
            margin > 0
              ? `Lead by ${margin} vote${margin !== 1 ? "s" : ""}`
              : "Tied",
        });

        const expirationTime = new Date();
        expirationTime.setSeconds(expirationTime.getSeconds() + 60);
        setSessionExpiration(expirationTime);
        setTimer(60);

        toast.success("Poll result retrieved successfully!");
      } else {
        setLeader(null);
        toast.error("No votes found for the entered ID.");
      }
    } else {
      setFilteredPoll(null);
      setLeader(null);
      toast.error("Poll not found for the entered ID.");
    }
  };

  const formatTimeRemaining = () => {
    if (timer <= 0) return "";
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    return `Expires in ${minutes}:${seconds < 10 ? "0" : ""}${seconds} seconds`;
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <ResponsiveAppBar theme={theme} />
        <div
          className="App"
          style={{
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#f5f5f5",
            minHeight: "100vh",
          }}
        >
          <Container>
            <Box
              sx={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: theme.typography.heading.color,
                  marginBottom: "20px",
                }}
              >
                Polls Data
              </Typography>
              <Card
                elevation={3}
                sx={{
                  padding: "20px",
                  marginBottom: "20px",
                  width: "100%",
                  maxWidth: "600px",
                }}
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
                  error={Boolean(validationError)}
                  helperText={validationError}
                  style={{ marginBottom: "20px" }}
                />

                <Tooltip title="Get Result" arrow>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleGetResult}
                      disabled={!filterId}
                    >
                      Get Result
                    </Button>
                  </Box>
                </Tooltip>
              </Card>

              {filteredPoll && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ padding: "15px" }}>
                      <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                        <b>Poll Details</b>
                      </Typography>
                      <Typography variant="body1">
                        <strong>ID:</strong> {filteredPoll.id}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Poll Name:</strong> {filteredPoll.pollName}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Question:</strong> {filteredPoll.question}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Options:</strong>{" "}
                        {filteredPoll.options
                          .map(
                            (option) =>
                              `${option} (${
                                filteredPoll.votes.filter(
                                  (vote) => vote === option
                                ).length
                              } votes)`
                          )
                          .join(", ")}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Total Votes:</strong>{" "}
                        {filteredPoll.votes.length}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Margin:</strong> {leader?.margin}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ padding: "15px" }}>
                      <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                        <b>Votes</b>
                      </Typography>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Votes</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow key={filteredPoll.id}>
                            <TableCell>{filteredPoll.id}</TableCell>
                            <TableCell>
                              {filteredPoll.votes.join(", ")}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Paper>
                  </Grid>
                </Grid>
              )}
              {leader && (
                <Paper
                  elevation={3}
                  sx={{
                    padding: "15px",
                    marginTop: "20px",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6">
                    <b>Leader</b>(WON)
                  </Typography>
                  <StarIcon color="secondary" sx={{ fontSize: 40 }} />
                  <Typography variant="body1">{leader.leaders}</Typography>
                </Paper>
              )}

              {timer > 0 && (
                <Typography
                  variant="body2"
                  sx={{
                    marginTop: "20px",
                    color: theme.palette.primary.main,
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                  }}
                >
                  {formatTimeRemaining()}
                </Typography>
              )}

              <ToastContainer position="top-right" autoClose={3000} />
            </Box>
          </Container>

          {/* Welcome Modal */}
          <Modal
            open={showWelcomeModal}
            onClose={handleCloseWelcomeModal}
            title="Welcome to the Polls App"
          >
            {/* Enter your Poll ID to get started. */}
            To view the poll result, enter the Poll ID and click the "Get
            Result" button.
          </Modal>

          {/* Guidelines Modal */}
          <Modal
            open={showGuidelinesModal}
            onClose={handleCloseGuidelinesModal}
            title="Guidelines"
          >
            The session will expire after one minute. Follow these guidelines
            for a better experience.
          </Modal>
        </div>{" "}
      </>
    </ThemeProvider>
  );
}

export default App;
