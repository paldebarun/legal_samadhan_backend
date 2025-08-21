const NewsEvent = require('../models/news_events');


exports.createNewsEvent = async (data) => {
  try {
    const newsEvent = new NewsEvent({
      ...data,
      date: data.date || Date.now(), // fallback if not provided
    });
    return await newsEvent.save();
  } catch (error) {
    throw new Error('Error creating News/Event: ' + error.message);
  }
};


exports.getAllNewsEvents = async () => {
  try {
    return await NewsEvent.find().sort({ date: -1 });
  } catch (error) {
    throw new Error('Error fetching all News/Events: ' + error.message);
  }
};


exports.getNewsEventById = async (id) => {
  try {
    return await NewsEvent.findById(id);
  } catch (error) {
    throw new Error('Error fetching News/Event by ID: ' + error.message);
  }
};


exports.updateNewsEvent = async (id, data) => {
  try {
    if (data.date === undefined) {
    
      delete data.date;
    }
    return await NewsEvent.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new Error('Error updating News/Event: ' + error.message);
  }
};

// Delete News/Event
exports.deleteNewsEvent = async (id) => {
  try {
    return await NewsEvent.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting News/Event: ' + error.message);
  }
};
