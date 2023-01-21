const express = require("express");
const router = express.Router();

// Controller Methods
const { generateImages, generateImageVariations } = require("../controllers/openaiController");

// Generate Images
router.post('/generate-images', generateImages);

// Generate Image Variations
router.post('/generate-image-variations', generateImageVariations);

module.exports = router;