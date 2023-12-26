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
  List,
  ListItem,
  ListItemText,
  createTheme,
  ThemeProvider,
  Box,
} from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";
import StarIcon from "@mui/icons-material/Star";

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
    // Add a custom red color
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

  useEffect(() => {
    fetch("https://657aaf5e1acd268f9afb9276.mockapi.io/api/v1/polls")
      .then((response) => response.json())
      .then((data) => setPolls(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleFilterChange = (event) => {
    setFilterId(event.target.value);
  };

  useEffect(() => {
    if (filterId) {
      const foundPoll = polls.find((poll) => poll.id === filterId);
      setFilteredPoll(foundPoll);

      if (foundPoll) {
        const voteCounts = foundPoll.votes.reduce((acc, name) => {
          acc[name] = (acc[name] || 0) + 1;
          return acc;
        }, {});

        const maxVotes = Math.max(...Object.values(voteCounts));
        const leaders = Object.keys(voteCounts).filter(
          (name) => voteCounts[name] === maxVotes
        );

        setLeader(leaders.join(", "));
      } else {
        setLeader(null);
      }
    } else {
      setFilteredPoll(null);
      setLeader(null);
    }
  }, [filterId, polls]);

  return (
    <ThemeProvider theme={theme}>
      <>
        <ResponsiveAppBar theme={theme} />
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
            sx={{ color: theme.typography.heading.color, marginBottom: "20px" }}
          >
            Polls Data
          </Typography>
          <TextField
            type="text"
            value={filterId}
            onChange={handleFilterChange}
            label="Enter Poll ID"
            variant="outlined"
            sx={{ width: "25%", marginBottom: "20px" }}
          />
          {filteredPoll && (
            <Paper
              elevation={3}
              sx={{ marginBottom: "20px", padding: "15px", width: "50%" }}
            >
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
                    <TableCell>{filteredPoll.votes.join(", ")}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          )}
          {leader && (
            <Paper
              elevation={3}
              sx={{ marginBottom: "20px", padding: "15px", width: "50%" }}
            >
              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center" }}
              >
                Leaderboard{" "}
                <StarIcon fontSize="small" sx={{ marginLeft: "5px" }} />
              </Typography>
              <Typography
                sx={{ color: theme.palette.red.main, marginTop: "10px" }}
              >{`${leader} is taking the lead!`}</Typography>
            </Paper>
          )}
          {filteredPoll && (
            <Paper
              elevation={3}
              sx={{ marginBottom: "20px", padding: "15px", width: "50%" }}
            >
              <Typography variant="h6">Results</Typography>
              <List>
                {Object.entries(
                  filteredPoll.votes.reduce((acc, name) => {
                    acc[name] = (acc[name] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([label, votes], index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`${label} - ${votes} votes`} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Box>{" "}
      </>
    </ThemeProvider>
  );
}

export default App;
