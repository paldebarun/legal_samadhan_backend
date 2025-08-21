const express = require('express');
const router = express.Router();
const publicationService = require('../services/publications');

// Create a new publication
router.post('/', async (req, res) => {
  try {
    const data = await publicationService.createPublication(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all publications
router.get('/', async (req, res) => {
  try {
    const data = await publicationService.getAllPublications();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a publication by ID
router.get('/:id', async (req, res) => {
  try {
    const data = await publicationService.getPublicationById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Publication not found' });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a publication by ID
router.put('/:id', async (req, res) => {
  try {
    const data = await publicationService.updatePublication(req.params.id, req.body);
    if (!data) return res.status(404).json({ message: 'Publication not found' });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a publication by ID
router.delete('/:id', async (req, res) => {
  try {
    const data = await publicationService.deletePublication(req.params.id);
    if (!data) return res.status(404).json({ message: 'Publication not found' });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
