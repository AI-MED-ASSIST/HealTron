const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // You can add regex validation for a proper email if you wish, e.g.,
    // match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  phone: {
    type: String,
    required: true,
  },
  emergencyContact: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "",
    // Store a URL or file path
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  weight: {
    type: Number,
  },
  height: {
    type: Number,
  },
  // Additional emergency contacts are optional
  emergencyContacts: {
    type: [String],
    default: [],
  },
  // Array of strings to hold any number of medical conditions
  medicalConditions: {
    type: [String],
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
