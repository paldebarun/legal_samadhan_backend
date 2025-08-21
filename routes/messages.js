const express = require('express');
const router = express.Router();
const messageController = require('../services/messages');

// Create a new message
router.post('/', async (req, res) => {
  try {
    const data = await messageController.createMessage(req, res);
    // createMessage already sends response
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all messages
router.get('/', async (req, res) => {
  try {
    const data = await messageController.getAllMessages(req, res);
    // getAllMessages already sends response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a message by ID
router.get('/:id', async (req, res) => {
  try {
    const data = await messageController.getMessageById(req, res);
    // getMessageById already sends response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a message by ID
router.put('/:id', async (req, res) => {
  try {
    const data = await messageController.updateMessage(req, res);
    // updateMessage already sends response
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a message by ID
router.delete('/:id', async (req, res) => {
  try {
    const data = await messageController.deleteMessage(req, res);
    // deleteMessage already sends response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
