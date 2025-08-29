
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB
connectDB();


// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());
app.use(logger);

// Keep-alive routes (mount first to keep server awake)

// API Routes

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

// Error Handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Data collection service started`);
  console.log(`⏰ Collection interval: Every 10 minutes`);
  console.log(`📅 Daily aggregation: At midnight`);
  console.log(`🗑️  Data TTL: 24 hours`);
  console.log(`💚 Keep-alive endpoints: /keep-alive, /health`);
  console.log(`🌐 Server URL: ${process.env.SERVER_URL || `http://localhost:${PORT}`}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await dataCollectionService.stopDataCollection();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Shutting down gracefully...");
  await dataCollectionService.stopDataCollection();
  process.exit(0);
});