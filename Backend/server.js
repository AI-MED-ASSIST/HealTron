// backend/server.js
require("dotenv").config({ path: "./backend/.env" });
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Import your routes
const userRoutes = require("./routes/user.routes");
const chatRoutes = require("./routes/chat.routes"); // assuming you have chat functionality also
const authRoutes = require("./routes/auth.routes");
const chatHistoryRoutes = require("./routes/chatHistory.routes"); // chathistory routes

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Set up routes
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes); // if applicable
app.use("/api/auth", authRoutes); //authentication routes
app.use("/api/chat/history", chatHistoryRoutes); // route for chat history

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Express server started on port ${PORT}`);
});

// // backend/server.js

// require("dotenv").config({ path: "./backend/.env" }); // Make sure your .env is in the correct location or specify its path if needed
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const chatRoutes = require("./routes/chat.routes");

// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Register API routes with a base path (e.g., /api)
// app.use("/api", chatRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Express server started on port ${PORT}`);
// });
