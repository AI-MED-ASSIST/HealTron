// backend/controllers/chatHistory.controller.js
const ChatSession = require("../models/chatSession.model");

exports.saveChatSession = async (req, res) => {
  try {
    const { userId, messages } = req.body;
    if (!userId || !messages) {
      return res.status(400).json({ error: "Missing userId or messages" });
    }
    const newSession = await ChatSession.create({ userId, messages });
    res.status(201).json({ session: newSession });
  } catch (error) {
    console.error("Error saving chat session:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: "Missing userId" });
    const sessions = await ChatSession.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ sessions });
  } catch (error) {
    console.error("Error fetching chat history:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Delete a chat session by its ID
exports.deleteChatSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const deletedSession = await ChatSession.findByIdAndDelete(sessionId);
    if (!deletedSession) {
      return res.status(404).json({ error: "Chat session not found" });
    }
    res.status(200).json({ message: "Chat session deleted successfully" });
  } catch (error) {
    console.error("Error deleting chat session:", error.message);
    res.status(500).json({ error: error.message });
  }
};
