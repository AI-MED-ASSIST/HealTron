// backend/routes/disease.routes.js
const express = require("express");
const multer = require("multer");
const {
  getDiseases,
  uploadDiseases,
} = require("../controllers/disease.controller.js");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// GET /api/diseases?q=foo
router.get("/", getDiseases);

// POST /api/diseases/upload  (form-field name “file”)
router.post("/upload", upload.single("file"), uploadDiseases);

module.exports = router;
