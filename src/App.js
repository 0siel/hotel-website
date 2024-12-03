import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms"; // Placeholder
import Events from "./pages/Events"; // Placeholder
import Login from "./pages/Login"; // Placeholder
import Reservations from "./pages/Reservations"; // Placeholder
import "./index.css"; // This assumes your styles are in src/index.css

const App = () => {
  return (
    <Router>
      <div className="bg-fffcf3 min-h-screen text-43523a">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/events" element={<Events />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reservations" element={<Reservations />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
