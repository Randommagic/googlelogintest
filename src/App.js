import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Callback from "./Callback";

function App() {
  const handleLoginClick = () => {
    window.location.href = "https://api.randommagic.xyz/auth/login/google";
    // window.location.href = "http://localhost:8000/auth/login/google";
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <button onClick={handleLoginClick} className="login-button">
                Log in with Google
              </button>
            }
          />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
