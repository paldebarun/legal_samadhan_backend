const Publication = require('../models/publications');

exports.createPublication = async (data) => {
  try {
    const publication = new Publication(data);
    return await publication.save();
  } catch (error) {
    throw new Error('Error creating publication: ' + error.message);
  }
};

// Get all publications, sorted by published_on descending
exports.getAllPublications = async () => {
  try {
    return await Publication.find()
      .populate("practice_area") 
      .sort({ published_on: -1 });
  } catch (error) {
    throw new Error('Error fetching publications: ' + error.message);
  }
};

// Get a publication by ID
exports.getPublicationById = async (id) => {
  try {
    return await Publication.findById(id);
  } catch (error) {
    throw new Error('Error fetching publication: ' + error.message);
  }
};

// Update a publication by ID
exports.updatePublication = async (id, data) => {
  try {
    return await Publication.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new Error('Error updating publication: ' + error.message);
  }
};

// Delete a publication by ID
exports.deletePublication = async (id) => {
  try {
    return await Publication.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting publication: ' + error.message);
  }
};
