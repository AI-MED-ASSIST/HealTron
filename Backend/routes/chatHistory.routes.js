// backend/routes/chatHistory.routes.js
const express = require("express");
const router = express.Router();
const {
  saveChatSession,
  getChatHistory,
  deleteChatSession,
} = require("../controllers/chatHistory.controller");

router.post("/", saveChatSession);
router.get("/:userId", getChatHistory);
router.delete("/:sessionId", deleteChatSession);

module.exports = router;
