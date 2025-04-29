const express = require("express");
const {
  createDiseasePred,
  getDiseasePreds,
  deleteDiseasePred,
} = require("../controllers/diseasePredController");

const router = express.Router();

// No auth middleware
router.post("/", createDiseasePred);
router.get("/", getDiseasePreds);
router.delete("/:id", deleteDiseasePred);

module.exports = router;
