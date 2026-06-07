const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const investmentRoutes =  require("./routes/investmentRoutes");

dotenv.config();
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// middleware
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);


// user routes
const userRoutes = require("./routes/userRoutes");

app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.use("/api/investment", investmentRoutes );

const goalRoutes =
  require("./routes/goalRoutes");

const dashboardRoutes =
  require("./routes/dashboardRoutes");

app.use("/api/goals", goalRoutes);

app.use("/api/dashboard", dashboardRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});