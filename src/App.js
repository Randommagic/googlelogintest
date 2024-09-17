import React from "react";
import "./App.css";

function App() {
  const handleLoginClick = () => {
    window.location.href = "https://api.randommagic.xyz/auth/login/google";
  };

  return (
    <div className="App">
      <button onClick={handleLoginClick} className="login-button">
        Log in with Google
      </button>
    </div>
  );
}

export default App;
