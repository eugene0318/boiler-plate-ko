import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />}></Route>
        <Route exact path="/login" element={<LoginPage />}></Route>
        <Route exact path="/register" element={<RegisterPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
