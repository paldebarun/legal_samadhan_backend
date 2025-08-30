const Team = require("../models/team");
const {uploadImageFile} =require('./image_upload')

// Create a new team member
// exports.createTeamMember = async (req, res) => {
//   try {
//     let imageUrl = "";
//     console.log("This is file : ",req.files)
//     if (req.files && req.files.imageFile) {
//       console.log("sending file : ",req.files.imageFile)
//       const uploadResponse = await imageUpload(req, res);
//       if (uploadResponse.success) {
//         imageUrl = uploadResponse.imageUrl;
//       } 
//       else {
//         return res.status(400).json({ success: false, message: uploadResponse.message });
//       }
//     }

//     const data = { ...req.body, image_url: imageUrl };
//     const teamMember = new Team(data);
//     await teamMember.save();

//     return res.status(201).json({ success: true, teamMember });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

exports.createTeamMember = async (req, res) => {
  try {
    let imageUrl = "";
    if (req.files && req.files.imageFile) {
      imageUrl = await uploadImageFile(req.files.imageFile);
    }

    const data = { ...req.body, image_url: imageUrl };
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
    const teamMembers = await Team.find().populate("expertise").sort({ createdAt: -1 }); // newest first
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
