const express = require("express");
const router = express.Router();

// Controller Methods
const { generateImages } = require("../controllers/openaiController");

// Generate Images
router.post('/generate-images', generateImages);

module.exports = router;