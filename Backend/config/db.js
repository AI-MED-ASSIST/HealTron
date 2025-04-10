// backend/config/db.js

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // With driver version 4.x, these options are now defaults.
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
