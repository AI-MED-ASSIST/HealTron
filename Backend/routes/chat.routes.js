// backend/routes/chat.routes.js

const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat.controller");

// Chat endpoint for processing messages
router.post("/chat", chatController.chat);

// Greeting endpoint for returning a personalized greeting
router.post("/chat/greet", chatController.greetUser);

module.exports = router;
