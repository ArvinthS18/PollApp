// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PollCreation from "./Components/PollCreation";
import VotePage from "./Components/VotePage";
import Results from "./Components/Results";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="" element={<PollCreation />} />
        <Route path="/vote" element={<VotePage />} />
        <Route path="/result" element={<Results />} />
      </Routes>
    </Router>
  );
};

export default App;
