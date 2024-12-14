require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

// Connect to MongoDB
connectDB();


app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.get('/', (req,res) => {
    res.send('Welcome to personal blog Api!');
});
app.use(authRoutes);
app.use(postRoutes);

app.listen(7000, () => {
  console.log(`Server running on port 7000`);
});