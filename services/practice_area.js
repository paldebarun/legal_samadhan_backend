const PracticeArea = require('../models/practice_area');

// Create a new Practice Area
exports.createPracticeArea = async (req, res) => {
  try {
    const practiceArea = new PracticeArea(req.body);
    const savedPracticeArea = await practiceArea.save();
    return res.status(201).json({ success: true, practiceArea: savedPracticeArea });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ success: false, message: 'Error creating practice area', error: error.message });
  }
};

// Get all Practice Areas
exports.getAllPracticeAreas = async (req, res) => {
  try {
    const practiceAreas = await PracticeArea.find().sort({ name: 1 });
    return res.status(200).json({ success: true, practiceAreas });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error fetching practice areas', error: error.message });
  }
};

// Get Practice Area by ID
exports.getPracticeAreaById = async (req, res) => {
  try {
    const practiceArea = await PracticeArea.findById(req.params.id);
    if (!practiceArea) {
      return res.status(404).json({ success: false, message: 'Practice area not found' });
    }
    return res.status(200).json({ success: true, practiceArea });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error fetching practice area', error: error.message });
  }
};

// Update Practice Area
exports.updatePracticeArea = async (req, res) => {
  try {
    const updatedPracticeArea = await PracticeArea.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPracticeArea) {
      return res.status(404).json({ success: false, message: 'Practice area not found' });
    }
    return res.status(200).json({ success: true, practiceArea: updatedPracticeArea });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ success: false, message: 'Error updating practice area', error: error.message });
  }
};

// Delete Practice Area
exports.deletePracticeArea = async (req, res) => {
  try {
    const deletedPracticeArea = await PracticeArea.findByIdAndDelete(req.params.id);
    if (!deletedPracticeArea) {
      return res.status(404).json({ success: false, message: 'Practice area not found' });
    }
    return res.status(200).json({ success: true, message: 'Practice area deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error deleting practice area', error: error.message });
  }
};
