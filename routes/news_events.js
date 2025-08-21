const express = require("express");
const router = express.Router();
const newsEventService = require("../services/news_events");


router.post("/", async (req, res) => {
  try {
    const data = await newsEventService.createNewsEvent(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const data = await newsEventService.getAllNewsEvents();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const data = await newsEventService.getNewsEventById(req.params.id);
    if (!data) return res.status(404).json({ message: "News/Event not found" });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const data = await newsEventService.updateNewsEvent(req.params.id, req.body);
    if (!data) return res.status(404).json({ message: "News/Event not found" });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const data = await newsEventService.deleteNewsEvent(req.params.id);
    if (!data) return res.status(404).json({ message: "News/Event not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
