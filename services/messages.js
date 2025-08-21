const Message = require('../models/messages');

// Create a new message
exports.createMessage = async (req, res) => {
  try {
    const { fullname, email, subject, message, agreement } = req.body;

    const newMessage = new Message({
      fullname,
      email,
      subject,
      message,
      agreement
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create message' });
  }
};

// Get all messages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// Get a single message by ID
exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ error: 'Message not found' });
    res.status(200).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch message' });
  }
};

// Update a message by ID
exports.updateMessage = async (req, res) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMessage) return res.status(404).json({ error: 'Message not found' });
    res.status(200).json(updatedMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update message' });
  }
};

// Delete a message by ID
exports.deleteMessage = async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);
    if (!deletedMessage) return res.status(404).json({ error: 'Message not found' });
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
};
