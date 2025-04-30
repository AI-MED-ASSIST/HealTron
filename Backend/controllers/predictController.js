// controllers/predictController.js
const axios = require("axios");
const { CHAT_API_BASE_URL } = process.env;
const CHAT_API_URL = `${CHAT_API_BASE_URL}/api/chat`;

async function handlePredict(req, res) {
  const { model } = req.params;
  const data = req.body;

  try {
    // wrap model + data under the "message" field
    const payload = {
      message: {
        model,
        data,
      },
    };

    const aiRes = await axios.post(CHAT_API_URL, payload, {
      headers: { "Content-Type": "application/json" },
    });

    res.json(aiRes.data);
  } catch (err) {
    console.error(err);
    const msg = err.response?.data || err.message;
    res.status(500).json({ error: msg });
  }
}

module.exports = { handlePredict };
