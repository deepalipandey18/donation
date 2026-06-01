import React, { useEffect, useState } from "react";

const API = "http://localhost:5000/api";

function AdminPanel() {
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch all donations
  const fetchDonations = async () => {
    const res = await fetch(`${API}/donations`);
    const data = await res.json();
    setDonations(data);
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  // Delete donation
  const deleteDonation = async (id) => {
    await fetch(`${API}/donate/${id}`, {
      method: "DELETE"
    });

    fetchDonations();
  };

  // Filter data
  const filtered = donations.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Admin Panel</h2>

      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table border="1" style={{ margin: "20px auto" }}>
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
                <button onClick={() => deleteDonation(d._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;