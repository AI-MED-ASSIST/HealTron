// // backend/models/user.model.js

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   password: { type: String, required: true },
//   // Add any additional fields as needed (email, password hash, etc.)
// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;

// backend/models/user.model.js
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
  // Exactly 3 emergency contacts (in addition to the primary emergencyContact field)
  emergencyContacts: {
    type: [String],
    validate: {
      validator: function (arr) {
        // Allow empty array or exactly 3 contacts if provided
        return arr.length === 0 || arr.length === 3;
      },
      message: "Emergency contacts should be empty or exactly 3 numbers.",
    },
  },
  // Array of strings to hold any number of medical conditions
  medicalConditions: {
    type: [String],
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
