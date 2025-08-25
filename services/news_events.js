const NewsEvent = require('../models/news_events');

// Create News/Event
exports.createNewsEvent = async (req, res) => {
  try {
    const { title, description, date, category } = req.body;

    const newNewsEvent = new NewsEvent({
      title,
      description,
      category,
      date: date || Date.now(), 
    });

    const savedNewsEvent = await newNewsEvent.save();
    return res.status(201).json({ success: true, newsEvent: savedNewsEvent });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to create News/Event', error: error.message });
  }
};

// Get all News/Events
exports.getAllNewsEvents = async (req, res) => {
  try {
    const newsEvents = await NewsEvent.find().sort({ date: -1 });
    return res.status(200).json({ success: true, newsEvents });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to fetch News/Events', error: error.message });
  }
};

// Get News/Event by ID
exports.getNewsEventById = async (req, res) => {
  try {
    const newsEvent = await NewsEvent.findById(req.params.id);
    if (!newsEvent) {
      return res.status(404).json({ success: false, message: 'News/Event not found' });
    }
    return res.status(200).json({ success: true, newsEvent });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to fetch News/Event', error: error.message });
  }
};

// Update News/Event
exports.updateNewsEvent = async (req, res) => {
  try {
    if (req.body.date === undefined) {
      delete req.body.date;
    }

    const updatedNewsEvent = await NewsEvent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedNewsEvent) {
      return res.status(404).json({ success: false, message: 'News/Event not found' });
    }

    return res.status(200).json({ success: true, newsEvent: updatedNewsEvent });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to update News/Event', error: error.message });
  }
};

// Delete News/Event
exports.deleteNewsEvent = async (req, res) => {
  try {
    const deletedNewsEvent = await NewsEvent.findByIdAndDelete(req.params.id);
    if (!deletedNewsEvent) {
      return res.status(404).json({ success: false, message: 'News/Event not found' });
    }
    return res.status(200).json({ success: true, message: 'News/Event deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to delete News/Event', error: error.message });
  }
};
