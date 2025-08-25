const express = require("express");
const router = express.Router();
const practiceAreaController = require("../controllers/practice_area");

// Create a new Practice Area
router.post("/", practiceAreaController.createPracticeArea);

// Get all Practice Areas
router.get("/", practiceAreaController.getAllPracticeAreas);

// Get Practice Area by ID
router.get("/:id", practiceAreaController.getPracticeAreaById);

// Update Practice Area
router.put("/:id", practiceAreaController.updatePracticeArea);

// Delete Practice Area
router.delete("/:id", practiceAreaController.deletePracticeArea);

module.exports = router;
