const Application = require('../models/application');


exports.createApplication = async (req, res) => {
  try {
    const {
      job,
      first_name,
      last_name,
      graduated_from,
      percentage_of_grade,
      current_employer,
      current_designation,
      college,
      current_year_in_college,
      location_preference,
      availability,
      email,
    } = req.body;

    const newApplication = new Application({
      job,
      first_name,
      last_name,
      graduated_from,
      percentage_of_grade,
      current_employer,
      current_designation,
      college,
      current_year_in_college,
      location_preference,
      availability,
      email,
    });

    const savedApplication = await newApplication.save();
    return res.status(201).json({ success: true, application: savedApplication });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to create application', error: error.message });
  }
};


exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('job')
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, applications });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to fetch applications', error: error.message });
  }
};


exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate('job');
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    return res.status(200).json({ success: true, application });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to fetch application', error: error.message });
  }
};


exports.updateApplication = async (req, res) => {
  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedApplication) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    return res.status(200).json({ success: true, application: updatedApplication });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to update application', error: error.message });
  }
};


exports.deleteApplication = async (req, res) => {
  try {
    const deletedApplication = await Application.findByIdAndDelete(req.params.id);
    if (!deletedApplication) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    return res.status(200).json({ success: true, message: 'Application deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to delete application', error: error.message });
  }
};
