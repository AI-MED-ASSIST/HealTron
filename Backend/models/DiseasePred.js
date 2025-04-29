// backend/models/DiseasePred.js
const mongoose = require("mongoose");

const diseasePredSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    diseaseType: { type: String, required: true },
    probability: { type: Number, required: true },
    modelAccuracy: { type: Number, required: true },
    details: { type: Array, required: true },
    recommendation: { type: String, required: true },
  },
  {
    collection: "diseasePred",
    timestamps: true,
  }
);

module.exports = mongoose.model("DiseasePred", diseasePredSchema);
