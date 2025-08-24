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
    res.status(201).json(savedApplication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create application' });
  }
};


exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('job')
      .sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};


exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate('job');
    if (!application) return res.status(404).json({ error: 'Application not found' });
    res.status(200).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch application' });
  }
};


exports.updateApplication = async (req, res) => {
  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedApplication) return res.status(404).json({ error: 'Application not found' });
    res.status(200).json(updatedApplication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update application' });
  }
};


exports.deleteApplication = async (req, res) => {
  try {
    const deletedApplication = await Application.findByIdAndDelete(req.params.id);
    if (!deletedApplication) return res.status(404).json({ error: 'Application not found' });
    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete application' });
  }
};
