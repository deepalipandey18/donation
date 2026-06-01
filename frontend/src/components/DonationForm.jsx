import React, { useState } from "react";

const API = "http://localhost:5000/api";

function DonationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    amount: "",
    campaign: "Education"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${API}/donate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    alert("Donation Successful!");

    setForm({
      name: "",
      email: "",
      amount: "",
      campaign: "Education"
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Donate</h2>

      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <br />

      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <br />

      <input name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" required />
      <br />

      <select name="campaign" value={form.campaign} onChange={handleChange}>
        <option>Education</option>
        <option>Health</option>
        <option>Food</option>
      </select>
      <br />

      <button type="submit">Donate</button>
    </form>
  );
}

export default DonationForm;