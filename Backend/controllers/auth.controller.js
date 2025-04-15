// backend/controllers/auth.controller.js
const User = require("../models/user.model");

exports.login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  if (!usernameOrEmail || !password) {
    return res
      .status(400)
      .json({ error: "Username/Email and password are required" });
  }
  try {
    // Find user by username or email
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // In production, compare hashed passwords. For now, compare plain text.
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // Return user data (in production, you may also return a token)
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message });
  }
};
