// backend/routes/disease.routes.js
const express = require("express");

const { getDiseases } = require("../controllers/disease.controller.js");

const router = express.Router();

// GET /api/diseases?q=foo
router.get("/", getDiseases);

module.exports = router;
