// backend/routes/user.routes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Endpoint to sign up (create a new user)
router.post("/", userController.createUser);

// Endpoint to get user profile by ID
router.get("/:id", userController.getUser);

// Endpoint to update user profile by ID
router.put("/:id", userController.updateUser);

module.exports = router;
