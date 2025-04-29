const express = require("express");
const router = express.Router();
const { handlePredict } = require("../controllers/predictController");

router.post("/:model", handlePredict);

module.exports = router;
