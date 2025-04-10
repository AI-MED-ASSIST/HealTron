require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const apiKey =
  process.env.GOOGLE_API_KEY || "AIzaSyClvLefxDfy4ms6fJG9MfIGw9a-5KwYUCE";

// Create an instance of the GoogleGenAI client
const aiClient = new GoogleGenAI({ apiKey });

module.exports = aiClient;
