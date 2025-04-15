// backend/routes/chat.routes.js

const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat.controller");

// Chat endpoint for processing messages
router.post("/", chatController.chat);

// Greeting endpoint for returning a personalized greeting
router.post("/greet", chatController.greetUser);

module.exports = router;
