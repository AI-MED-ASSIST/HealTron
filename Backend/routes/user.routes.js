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

// Endpoint to delete a medical condition from user profile
router.delete(
  "/:userId/medical-condition",
  userController.deleteMedicalCondition
);

// Add medical condition
router.put("/:id/medical-conditions", userController.addMedicalCondition);

module.exports = router;
