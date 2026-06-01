import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPanel.css";

const API = "http://localhost:5000/api";

function AdminPanel() {
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const fetchDonations = async () => {
    try {
      const res = await fetch(`${API}/donations`);
      const data = await res.json();
      setDonations(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const deleteDonation = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this donation?"
    );

    if (!confirmDelete) return;

    await fetch(`${API}/donate/${id}`, {
      method: "DELETE",
    });

    fetchDonations();
  };

  const filtered = donations.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalAmount = donations.reduce(
    (sum, d) => sum + Number(d.amount),
    0
  );

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>⚙️ Admin Dashboard</h1>

        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          ← Back
        </button>
      </div>

      <div className="admin-stats">
        <div className="admin-card">
          <h3>Total Donations</h3>
          <p>₹{totalAmount}</p>
        </div>

        <div className="admin-card">
          <h3>Total Donors</h3>
          <p>{donations.length}</p>
        </div>

        <div className="admin-card">
          <h3>Campaigns</h3>
          <p>3</p>
        </div>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Search donor name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Campaign</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((d) => (
              <tr key={d._id}>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>₹{d.amount}</td>
                <td>{d.campaign}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteDonation(d._id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="5">
                  No donors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;