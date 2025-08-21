const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database')
const newsEventRoutes = require("./routes/news_events");
const teamRoutes=require('./routes/team');
const publicationRoutes=require('./routes/publications')
const practiceareaRoutes=require('./routes/practice_area')
const messagesRoutes=require('./routes/messages')

dotenv.config();

const app = express();
const PORT = process.env.PORT ;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());



// Routes
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'Vivaahutsav API is working! ' });
});

app.use("/api/news-events", newsEventRoutes);
app.use("/api/team_management", teamRoutes);
app.use("/api/publications",publicationRoutes);
app.use('/api/practice_area',practiceareaRoutes);
app.use('/api/messages',messagesRoutes)


// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
