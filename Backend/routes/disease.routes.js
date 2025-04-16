// backend/routes/disease.routes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getDiseases,
  uploadDiseases,
} = require("../controllers/disease.controller");

// Configure multer for file uploads. Files will be stored temporarily in 'uploads/' folder.
const upload = multer({ dest: "uploads/" });

// GET diseases (existing endpoint)
router.get("/", getDiseases);

// POST /upload: Upload a JSON file containing disease dataset
router.post("/upload", upload.single("file"), uploadDiseases);

module.exports = router;
