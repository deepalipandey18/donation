import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api";

function Dashboard() {
  const [donations, setDonations] = useState([]);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate(); // 🔥 important

  const fetchData = async () => {
    const res = await fetch(`${API}/donations`);
    const data = await res.json();

    setDonations(data);

    const sum = data.reduce((acc, curr) => acc + curr.amount, 0);
    setTotal(sum);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      {/* ✅ Admin Button */}
      <button onClick={() => navigate("/admin")}>
        Go to Admin Panel
      </button>

      <h3>Total Donation: ₹{total}</h3>

      <h3>Leader board</h3>
      <ul>
        {donations.slice(0, 5).map((d, index) => (
          <li key={index}>
            {d.name} donated ₹{d.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;