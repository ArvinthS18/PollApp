import React, { useState, useEffect } from "react";
import { TextField, Button, Card, CardContent } from "@mui/material";

function App() {
  const [polls, setPolls] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [filterId, setFilterId] = useState("");
  const [filteredPoll, setFilteredPoll] = useState(null);

  useEffect(() => {
    fetch("https://657aaf5e1acd268f9afb9276.mockapi.io/api/v1/polls")
      .then((response) => response.json())
      .then((data) => setPolls(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleFilterChange = (event) => {
    setFilterId(event.target.value);
    setSelectedOption("");
    const foundPoll = polls.find((poll) => poll.id === event.target.value);
    setFilteredPoll(foundPoll || null);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
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
          alert("You voted! Please reset UI.");
        })
        .catch((error) => console.error("Error submitting vote:", error));
    }

    setFilterId("");
  };

  const resetUI = () => {
    setFilteredPoll(null);
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Voting UI</h1>
      <div style={{ margin: "0 auto", maxWidth: 400 }}>
        <TextField
          label="Filter by ID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={filterId}
          onChange={handleFilterChange}
          placeholder="Enter ID"
          autoComplete="off" // Add this line to disable auto-completion
        />
        {filteredPoll && (
          <Card>
            <CardContent>
              <h2 style={{ textAlign: "center" }}>{filteredPoll.pollName}</h2>
              <p>{filteredPoll.question}</p>
              <form>
                {filteredPoll.options.map((option, index) => (
                  <div key={index} style={{ marginBottom: 10 }}>
                    <label>
                      <input
                        type="radio"
                        value={option}
                        checked={selectedOption === option}
                        onChange={handleOptionChange}
                      />
                      {option}
                    </label>
                  </div>
                ))}
              </form>
              <Button
                variant="contained"
                onClick={handleVoteSubmit}
                disabled={!selectedOption}
                style={{ marginTop: 10, marginRight: 10 }}
              >
                Submit Vote
              </Button>
              <Button
                variant="contained"
                onClick={resetUI}
                style={{ marginTop: 10 }}
              >
                Reset UI
              </Button>
              <p style={{ marginTop: 10 }}>Selected Option: {selectedOption}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default App;
