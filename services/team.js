const Team = require("../models/team");
const {uploadImageFile} =require('./image_upload')

exports.createTeamMember = async (req, res) => {
  try {
    let imageUrl = "";
    if (req.files && req.files.imageFile) {
      imageUrl = await uploadImageFile(req.files.imageFile);
    }

    const data = { ...req.body, image_url: imageUrl };
    
    console.log("This is the data : ",data)

    if (data.contacts) {
      if (Array.isArray(data.contacts)) {
        // Case: ["12345,67890"]
        data.contacts = data.contacts
          .join(",") // merge into a single string
          .split(",") // split back into array
          .map((c) => c.trim())
          .filter(Boolean);
      } else if (typeof data.contacts === "string") {
        // Case: "12345,67890"
        data.contacts = data.contacts
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean);
      }
    }

    // 🟢 Normalize location
    if (data.location) {
      if (Array.isArray(data.location)) {
        data.location = data.location
          .join(",")
          .split(",")
          .map((l) => l.trim())
          .filter(Boolean);
      } else if (typeof data.location === "string") {
        data.location = data.location
          .split(",")
          .map((l) => l.trim())
          .filter(Boolean);
      }
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
      if (Array.isArray(data.contacts)) {
        // Case: ["12345,67890"]
        data.contacts = data.contacts
          .join(",") // merge into a single string
          .split(",") // split back into array
          .map((c) => c.trim())
          .filter(Boolean);
      } else if (typeof data.contacts === "string") {
        // Case: "12345,67890"
        data.contacts = data.contacts
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean);
      }
    }

    // 🟢 Normalize location
    if (data.location) {
      if (Array.isArray(data.location)) {
        data.location = data.location
          .join(",")
          .split(",")
          .map((l) => l.trim())
          .filter(Boolean);
      } else if (typeof data.location === "string") {
        data.location = data.location
          .split(",")
          .map((l) => l.trim())
          .filter(Boolean);
      }
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
