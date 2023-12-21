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
} from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "'Courier New', monospace",
  },
  palette: {
    primary: {
      main: "#1976D2", // Change this to your preferred primary color
    },
    secondary: {
      main: "#4CAF50", // Change this to your preferred secondary color
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
        // Count occurrences of each name in the "votes" array
        const voteCounts = foundPoll.votes.reduce((acc, name) => {
          acc[name] = (acc[name] || 0) + 1;
          return acc;
        }, {});

        // Find the name with the maximum count
        const maxVotes = Math.max(...Object.values(voteCounts));
        const leaders = Object.keys(voteCounts).filter(
          (name) => voteCounts[name] === maxVotes
        );

        // Set the leader(s)
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
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Polls Data</Typography>
        <div style={{ margin: "10px 0" }}>
          <TextField
            type="text"
            value={filterId}
            onChange={handleFilterChange}
            label="Enter Poll ID"
            variant="outlined"
          />
        </div>
        {filteredPoll && (
          <Paper
            elevation={3}
            style={{ marginBottom: "20px", padding: "15px", width: "50%" }}
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
            style={{ marginBottom: "20px", padding: "15px", width: "50%" }}
          >
            <Typography variant="h6">Leaderboard</Typography>
            <Typography
              style={{ color: theme.palette.red.main }}
            >{`${leader} is taking the lead!`}</Typography>
          </Paper>
        )}
        {filteredPoll && (
          <Paper
            elevation={3}
            style={{ marginBottom: "20px", padding: "15px", width: "50%" }}
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
      </div>
    </ThemeProvider>
  );
}

export default App;
