// backend/controllers/disease.controller.js
const Disease = require("../models/disease.model");

exports.getDiseases = async (req, res) => {
  try {
    const filter = {};
    if (req.query.q) {
      filter.name = { $regex: req.query.q, $options: "i" };
    }
    const diseases = await Disease.find(filter).sort({ name: 1 });
    res.status(200).json({ diseases });
  } catch (err) {
    console.error("Error fetching diseases:", err);
    res.status(500).json({ error: err.message });
  }
};
