import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import VideoChat from "./chat";  // ✅ Import Chat.jsx correctly

const App = () => {
  return (
    <Router>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Welcome to Video Chat</h1>
        <Link to="/chat">
          <button>Go to Chat</button>
        </Link>

        {/* Define Routes */}
        <Routes>
          <Route path="/chat" element={<VideoChat />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
