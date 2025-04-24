// backend/controllers/user.controller.js
const User = require("../models/user.model");

// Create a new user (sign up)
exports.createUser = async (req, res) => {
  try {
    // Optionally, hash the password with bcrypt before saving.
    const newUser = new User(req.body);
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get a user's profile
exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update a user's profile
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a Medical Condition from User Profile
exports.deleteMedicalCondition = async (req, res) => {
  try {
    const { userId } = req.params;
    const { condition } = req.body;
    if (!condition)
      return res.status(400).json({ error: "Missing medical condition" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Remove condition from the medicalConditions array
    user.medicalConditions = user.medicalConditions.filter(
      (c) => c !== condition
    );
    await user.save();
    res
      .status(200)
      .json({ message: "Medical condition deleted successfully", user });
  } catch (error) {
    console.error("Error deleting medical condition:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.addMedicalCondition = async (req, res) => {
  try {
    const { id } = req.params;
    const { condition } = req.body;
    if (!condition) {
      return res.status(400).json({ error: "No condition provided" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Append only if not already present
    if (!user.medicalConditions.includes(condition)) {
      user.medicalConditions.push(condition);
      await user.save();
    }

    return res.json({ medicalConditions: user.medicalConditions });
  } catch (err) {
    console.error("addMedicalCondition error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
