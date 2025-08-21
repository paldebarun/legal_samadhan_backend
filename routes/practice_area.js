const express = require("express");
const router = express.Router();
const practiceAreaController = require("../services/practice_area");

// Create a new Practice Area
router.post("/", async (req, res) => {
  try {
    await practiceAreaController.createPracticeArea(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Practice Areas
router.get("/", async (req, res) => {
  try {
    await practiceAreaController.getAllPracticeAreas(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Practice Area by ID
router.get("/:id", async (req, res) => {
  try {
    await practiceAreaController.getPracticeAreaById(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Practice Area
router.put("/:id", async (req, res) => {
  try {
    await practiceAreaController.updatePracticeArea(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Practice Area
router.delete("/:id", async (req, res) => {
  try {
    await practiceAreaController.deletePracticeArea(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
