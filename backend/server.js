const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect database
mongoose.connect("mongodb+srv://deepalipandey1802_db_user:wa5NNeVBxKknL7B9@deepali.dk2sghm.mongodb.net/")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// routes
const donationRoutes = require("./routes/DonationRoutes");
app.use("/api", donationRoutes);

// start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
