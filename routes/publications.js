const express = require('express');
const router = express.Router();
const publicationController = require('../controllers/publications');

// Create a new publication
router.post('/', publicationController.createPublication);

// Get all publications
router.get('/', publicationController.getAllPublications);

// Get a publication by ID
router.get('/:id', publicationController.getPublicationById);

// Update a publication by ID
router.put('/:id', publicationController.updatePublication);

// Delete a publication by ID
router.delete('/:id', publicationController.deletePublication);

module.exports = router;
