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

// Register route
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    const token = generateToken({ userId: user._id, role: user.role });
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = generateToken({ userId: user._id, role: user.role });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/hello', (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
