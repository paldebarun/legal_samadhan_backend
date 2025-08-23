const express = require("express");
const router = express.Router();
const teamService = require("../services/team");

// Create a new team member
router.post("/", teamService.createTeamMember);

// Get all team members
router.get("/", teamService.getAllTeamMembers);

// Get team member by ID
router.get("/:id", teamService.getTeamMemberById);

// Update team member
router.put("/:id", teamService.updateTeamMember);

// Delete team member
router.delete("/:id", teamService.deleteTeamMember);

module.exports = router;
