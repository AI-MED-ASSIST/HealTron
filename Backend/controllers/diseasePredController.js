const DiseasePred = require("../models/DiseasePred");

// POST /api/diseasepred
// Expects { userId, diseaseType, probability, modelAccuracy, details, recommendation }
exports.createDiseasePred = async (req, res) => {
  try {
    const {
      userId,
      diseaseType,
      probability,
      modelAccuracy,
      details,
      recommendation,
    } = req.body;
    const pred = await DiseasePred.create({
      user: userId,
      diseaseType,
      probability,
      modelAccuracy,
      details,
      recommendation,
    });
    res.status(201).json(pred);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/diseasepred?userId=...
exports.getDiseasePreds = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "userId required" });

    const preds = await DiseasePred.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.json(preds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/diseasepred/:id
// No auth: deletes by ID
exports.deleteDiseasePred = async (req, res) => {
  try {
    const pred = await DiseasePred.findByIdAndDelete(req.params.id);
    if (!pred) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
