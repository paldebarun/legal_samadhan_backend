const Publication = require('../models/publications');

// Create a new publication
exports.createPublication = async (req, res) => {
  try {
    const publication = new Publication(req.body);
    const savedPublication = await publication.save();
    return res.status(201).json({ success: true, publication: savedPublication });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to create publication', error: error.message });
  }
};

// Get all publications, sorted by published_on descending
exports.getAllPublications = async (req, res) => {
  try {
    const publications = await Publication.find()
      .populate("practice_area")
      .sort({ published_on: -1 });
    return res.status(200).json({ success: true, publications });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to fetch publications', error: error.message });
  }
};

// Get a publication by ID
exports.getPublicationById = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ success: false, message: 'Publication not found' });
    }
    return res.status(200).json({ success: true, publication });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to fetch publication', error: error.message });
  }
};

// Update a publication by ID
exports.updatePublication = async (req, res) => {
  try {
    const updatedPublication = await Publication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPublication) {
      return res.status(404).json({ success: false, message: 'Publication not found' });
    }
    return res.status(200).json({ success: true, publication: updatedPublication });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to update publication', error: error.message });
  }
};

// Delete a publication by ID
exports.deletePublication = async (req, res) => {
  try {
    const deletedPublication = await Publication.findByIdAndDelete(req.params.id);
    if (!deletedPublication) {
      return res.status(404).json({ success: false, message: 'Publication not found' });
    }
    return res.status(200).json({ success: true, message: 'Publication deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to delete publication', error: error.message });
  }
};
