const PracticeArea = require('../models/practice_area');

// Create a new Practice Area
exports.createPracticeArea = async (req, res) => {
  try {
    const practiceArea = new PracticeArea(req.body);
    const saved = await practiceArea.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: 'Error creating practice area: ' + error.message });
  }
};

// Get all Practice Areas
exports.getAllPracticeAreas = async (req, res) => {
  try {
    const areas = await PracticeArea.find().sort({ name: 1 });
    res.status(200).json(areas);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching practice areas: ' + error.message });
  }
};

// Get Practice Area by ID
exports.getPracticeAreaById = async (req, res) => {
  try {
    const area = await PracticeArea.findById(req.params.id);
    if (!area) return res.status(404).json({ message: 'Practice area not found' });
    res.status(200).json(area);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching practice area: ' + error.message });
  }
};

// Update Practice Area
exports.updatePracticeArea = async (req, res) => {
  try {
    const updated = await PracticeArea.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Practice area not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Error updating practice area: ' + error.message });
  }
};

// Delete Practice Area
exports.deletePracticeArea = async (req, res) => {
  try {
    const deleted = await PracticeArea.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Practice area not found' });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting practice area: ' + error.message });
  }
};
