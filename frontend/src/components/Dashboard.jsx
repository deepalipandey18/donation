import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const API = "http://localhost:5000/api";

function Dashboard() {
  const [donations, setDonations] = useState([]);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API}/donations`);
      const data = await res.json();

      const sorted = [...data].sort((a, b) => b.amount - a.amount);

      setDonations(sorted);

      const sum = data.reduce(
        (acc, curr) => acc + Number(curr.amount),
        0
      );

      setTotal(sum);
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="title">💰 Donation Dashboard</h1>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Donations</h3>
          <p>₹{total}</p>
        </div>

        <div className="stat-card">
          <h3>Total Donors</h3>
          <p>{donations.length}</p>
        </div>

        <div className="stat-card">
          <h3>Top Donation</h3>
          <p>
            ₹
            {donations.length > 0
              ? donations[0].amount
              : 0}
          </p>
        </div>
      </div>

      <div className="action-section">
        <button
          className="admin-btn"
          onClick={() => navigate("/admin")}
        >
          Admin Panel
        </button>
      </div>

      <div className="leaderboard-card">
        <h2>🏆 Top Donors</h2>

        {donations.slice(0, 5).map((d, index) => (
          <div key={index} className="donor-row">
            <span>
              {index === 0 && "🥇"}
              {index === 1 && "🥈"}
              {index === 2 && "🥉"}
              {index > 2 && "🎖️"} {d.name}
            </span>

            <span>₹{d.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;