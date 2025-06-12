import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Footer from "./components/Footer";
import AdDetail from "./components/AdDetail";
import ProtectedRoute from "./components/ProtectedRoute ";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/adDetail/:id" element={<ProtectedRoute><AdDetail /></ProtectedRoute>}/>
          <Route path="*" element={<div>Page not found.</div>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
