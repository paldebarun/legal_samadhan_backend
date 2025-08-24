const Job = require('../models/job');


exports.createJob = async (req, res) => {
  try {
    const { practices, experience, locations, requirements, category } = req.body;

    const newJob = new Job({
      practices,
      experience,
      locations,
      requirements,
      category
    });

    const savedJob = await newJob.save();
    return res.status(201).json({ success: true, job: savedJob });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to create job', error: error.message });
  }
};


exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to fetch jobs', error: error.message });
  }
};


exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    return res.status(200).json({ success: true, job });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to fetch job', error: error.message });
  }
};


exports.updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedJob) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    return res.status(200).json({ success: true, job: updatedJob });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to update job', error: error.message });
  }
};


exports.deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    return res.status(200).json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to delete job', error: error.message });
  }
};
