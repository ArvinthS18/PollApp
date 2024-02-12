// // App.js
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import PollCreation from "./Components/PollCreation";
// import VotePage from "./Components/VotePage";
// import Results from "./Components/Results";
// import Login from "./Components/Login";
// import Register from "./Components/Register";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="" element={<PollCreation />} />
//         <Route path="/vote" element={<VotePage />} />
//         <Route path="/result" element={<Results />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
/*eslint-disable*/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import VotePage from "./Components/VotePage";
import EditPassword from "./Components/EditPassword";
import PollCreation from "./Components/PollCreation";
import Results from "./Components/Results";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editpassword" element={<EditPassword />} />
        <Route path="/poll" element={<PollCreation />} />
        <Route path="/vote" element={<VotePage />} />
        <Route path="/result" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
