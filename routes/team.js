const express = require("express");
const router = express.Router();
const teamService = require("../services/team");


router.post("/", async (req, res) => {
  try {
    const data = await teamService.createTeamMember(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const data = await teamService.getAllTeamMembers();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const data = await teamService.getTeamMemberById(req.params.id);
    if (!data) return res.status(404).json({ message: "Team member not found" });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const data = await teamService.updateTeamMember(req.params.id, req.body);
    if (!data) return res.status(404).json({ message: "Team member not found" });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await teamService.deleteTeamMember(req.params.id);
    if (!data) return res.status(404).json({ message: "Team member not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
