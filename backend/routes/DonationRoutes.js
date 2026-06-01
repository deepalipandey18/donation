const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");

// POST donation
router.post("/donate", async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    res.json({ message: "Donation successful" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all donations
router.get("/donations", async (req, res) => {
  const data = await Donation.find().sort({ date: -1 });
  res.json(data);
});

// leaderboard
router.get("/leaderboard", async (req, res) => {
  const data = await Donation.aggregate([
    {
      $group: {
        _id: "$email",
        total: { $sum: "$amount" },
        name: { $first: "$name" }
      }
    },
    { $sort: { total: -1 } }
  ]);
  res.json(data);
});

module.exports = router;