const Team = require("../models/team");

// Create a new team member
exports.createTeamMember = async (data) => {
  try {
    const teamMember = new Team(data);
    return await teamMember.save();
  } catch (error) {
    throw new Error("Error creating team member: " + error.message);
  }
};

// Get all team members
exports.getAllTeamMembers = async () => {
  try {
    return await Team.find().sort({ createdAt: -1 }); // newest first
  } catch (error) {
    throw new Error("Error fetching team members: " + error.message);
  }
};

// Get team member by ID
exports.getTeamMemberById = async (id) => {
  try {
    return await Team.findById(id);
  } catch (error) {
    throw new Error("Error fetching team member: " + error.message);
  }
};

// Update team member
exports.updateTeamMember = async (id, data) => {
  try {
    return await Team.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  } catch (error) {
    throw new Error("Error updating team member: " + error.message);
  }
};

// Delete team member
exports.deleteTeamMember = async (id) => {
  try {
    return await Team.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error deleting team member: " + error.message);
  }
};
