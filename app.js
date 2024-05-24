const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/authRoutes');
const { connectDB } = require('./config/db');
require('./config/passport');
const secretKey = "yvhbjn";

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send("Hello World!");
});

app.get('/api', (req, res) => {
  res.json({
    message: "Hello World!"
  });
});

app.post('/login', (req, res) => {
  const user = {
    id: 1,
    username: 'shivam',
    email: 'shivam@gmail.com'
  };
  jwt.sign({ user }, secretKey, { expiresIn: '300s' }, (err, token) => {
    res.json({
      token
    });
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});