require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const apiKey = process.env.GOOGLE_API_KEY;

// Create an instance of the GoogleGenAI client
const aiClient = new GoogleGenAI({ apiKey });

module.exports = aiClient;
