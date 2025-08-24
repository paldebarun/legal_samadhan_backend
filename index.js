const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database')
const newsEventRoutes = require("./routes/news_events");
const teamRoutes=require('./routes/team');
const publicationRoutes=require('./routes/publications')
const practiceareaRoutes=require('./routes/practice_area')
const messagesRoutes=require('./routes/messages')
const cloudinary = require("./config/cloudinary");
const jobRoutes = require('./routes/job');
const applicationRoutes=require('./routes/application')

const {PORT}=require('./config')
const fileupload = require("express-fileupload");



const app = express();


// Connect to MongoDB
connectDB();

//cloudinary connection
cloudinary.cloudinaryConnect();


// Middleware
app.use(cors({
  credentials : true,
  origin:true
}));
app.use(express.json());



app.use(fileupload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

// Routes
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'Legal Samadhan API is working! ' });
});
app.use("/api/news-events", newsEventRoutes);
app.use("/api/team_management", teamRoutes);
app.use("/api/publications",publicationRoutes);
app.use('/api/practice_area',practiceareaRoutes);
app.use('/api/messages',messagesRoutes)
app.use('/api/jobs', jobRoutes);
app.use('/api/application',applicationRoutes)


// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
