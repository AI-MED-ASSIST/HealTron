const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // Optionally add additional fields, e.g. description
  description: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Disease", diseaseSchema);
