import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Footer from "./components/Footer";
import AdDetail from "./components/AdDetail";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="my-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adDetail/:id" element={<AdDetail />} />
          <Route path="*" element={<div>Stranica nije pronađena.</div>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
