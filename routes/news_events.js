const express = require("express");
const router = express.Router();
const newsEventController = require("../controllers/news_events");

// Create News/Event
router.post("/", newsEventController.createNewsEvent);

// Get all News/Events
router.get("/", newsEventController.getAllNewsEvents);

// Get News/Event by ID
router.get("/:id", newsEventController.getNewsEventById);

// Update News/Event
router.put("/:id", newsEventController.updateNewsEvent);

// Delete News/Event
router.delete("/:id", newsEventController.deleteNewsEvent);

module.exports = router;
