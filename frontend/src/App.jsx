import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DonationForm from "./components/DonationForm";
import Dashboard from "./components/Dashboard";
import AdminPanel from "./components/AdminPanel";

import "./App.css";

function HomePage() {
  return (
    <div className="app-container">
      <div className="page-header">
        <h1>💝 Donation Tracker</h1>
        <p>Support causes and track donations in real-time</p>
      </div>

      <div className="main-layout">
        <div className="left-panel">
          <DonationForm />
        </div>

        <div className="right-panel">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;