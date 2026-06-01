import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DonationForm from "./components/DonationForm.jsx";
import Dashboard from "./components/Dashboard.jsx";
import AdminPanel from "./components/AdminPanel.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <DonationForm />
              <Dashboard />
            </>
          }
        />

        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;