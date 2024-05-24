const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/authRoutes');
const { connectDB } = require('./config/db');
const User = require('./models/User');
const { hashPassword, comparePassword } = require('./utils/passwordUtils');
const { generateToken } = require('./utils/jwtUtils');
const PORT = process.env.PORT || 3000;
require('./config/passport');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/hello', (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
