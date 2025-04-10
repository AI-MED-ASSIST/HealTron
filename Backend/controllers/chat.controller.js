// backend/controllers/chat.controller.js

const ai = require("../config/genai.config");
const User = require("../models/user.model");

// Regular chat endpoint: processes the user's input via the AI client.
exports.chat = async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // Ensure this matches your intended model identifier
      contents: message, // Pass the user's message as the content
    });
    res.json({ response: response.text });
  } catch (error) {
    console.error("Error processing /api/chat:", error);
    res.status(500).json({ error: error.message });
  }
};

// Greeting endpoint: retrieves user information from MongoDB and returns a personalized greeting.
exports.greetUser = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "No userId provided" });
  }

  try {
    // Query the MongoDB collection to retrieve user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Construct a personalized greeting message
    const greeting = `Hi ${user.username}! Welcome back. How can I assist you with your health today?`;
    res.json({ response: greeting });
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: error.message });
  }
};

// // backend/controllers/chat.controller.js

// const ai = require("../config/genai.config");

// exports.chat = async (req, res) => {
//   const { message } = req.body;
//   if (!message) {
//     return res.status(400).json({ error: "No message provided" });
//   }

//   try {
//     // Call the AI client to generate the content
//     const response = await ai.models.generateContent({
//       model: "gemini-2.0-flash", // Ensure this matches the model identifier you need
//       contents: message, // Pass user's message as the content
//     });

//     // Return the generated response text
//     res.json({ response: response.text });
//   } catch (error) {
//     console.error("Error processing /api/chat:", error);
//     res.status(500).json({ error: error.message });
//   }
// };
