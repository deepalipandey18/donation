import React, { useState } from "react";
import "./DonationForm.css";

const API = "http://localhost:5000/api";

function DonationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    amount: "",
    campaign: "Education",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(`${API}/donate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Donation failed");
      }

      alert("🎉 Donation Successful!");

      setForm({
        name: "",
        email: "",
        amount: "",
        campaign: "Education",
      });
    } catch (error) {
      alert("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donation-card">
      <div className="card-header">
        <h2>💝 Make a Donation</h2>
        <p>Support a cause and make an impact.</p>
      </div>

      <form onSubmit={handleSubmit} className="donation-form">
        <input
          type="text"
          name="name"
          placeholder="👤 Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="📧 Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="💰 Donation Amount"
          value={form.amount}
          onChange={handleChange}
          required
        />

        <select
          name="campaign"
          value={form.campaign}
          onChange={handleChange}
        >
          <option value="Education">📚 Education</option>
          <option value="Health">🏥 Health</option>
          <option value="Food">🍛 Food</option>
        </select>

        <button
          type="submit"
          className="donate-btn"
          disabled={loading}
        >
          {loading ? "Processing..." : "Donate Now"}
        </button>
        <div className="impact-box">
  <h4>Your Impact</h4>
  <p>📚 ₹500 can support education materials</p>
  <p>🏥 ₹1000 can help healthcare initiatives</p>
</div>
      </form>
    </div>
  );
}

export default DonationForm;