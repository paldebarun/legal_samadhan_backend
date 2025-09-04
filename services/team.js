const Team = require("../models/team");
const {uploadImageFile} =require('./image_upload')

exports.createTeamMember = async (req, res) => {
  try {
    let imageUrl = "";
    if (req.files && req.files.imageFile) {
      imageUrl = await uploadImageFile(req.files.imageFile);
    }

    const data = { ...req.body, image_url: imageUrl };
    
    if (data.contacts) {
      const contactsArr = data.contacts.split(",").map(c => c.trim()).filter(Boolean);
      data.contacts = contactsArr.length > 1 ? contactsArr : contactsArr[0];
    }

    // Normalize location
    if (data.location) {
      const locationArr = data.location.split(",").map(l => l.trim()).filter(Boolean);
      data.location = locationArr.length > 1 ? locationArr : locationArr[0];
    }


    const teamMember = new Team(data);
    await teamMember.save();

    return res.status(201).json({ success: true, teamMember });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all team members

exports.getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await Team.find().populate("expertise"); // newest first
    return res.status(200).json({ success: true, teamMembers });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching team members: " + error.message });
  }
};

// Get team member by ID
exports.getTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const teamMember = await Team.findById(id).populate("expertise");

    if (!teamMember) {
      return res.status(404).json({ success: false, message: "Team member not found" });
    }

    return res.status(200).json({ success: true, teamMember });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching team member: " + error.message });
  }
};




exports.updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };

    // Handle image upload
    if (req.files && req.files.imageFile) {
      data.image_url = await uploadImageFile(req.files.imageFile);
    }

    if (data.contacts) {
      const contactsArr = data.contacts.split(",").map(c => c.trim()).filter(Boolean);
      data.contacts = contactsArr.length > 1 ? contactsArr : contactsArr[0];
    }

    // Normalize location
    if (data.location) {
      const locationArr = data.location.split(",").map(l => l.trim()).filter(Boolean);
      data.location = locationArr.length > 1 ? locationArr : locationArr[0];
    }


    // Ensure expertise is an array
    if (data.expertise && !Array.isArray(data.expertise)) {
      data.expertise = [data.expertise];
    }

    const updatedTeamMember = await Team.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate("expertise");

    if (!updatedTeamMember) {
      return res.status(404).json({ success: false, message: "Team member not found" });
    }

    return res.status(200).json({ success: true, teamMember: updatedTeamMember });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};




// Delete team member
exports.deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Team.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Team member not found" });
    return res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
