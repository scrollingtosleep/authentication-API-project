const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/authRoutes');
// const profileRoutes = require('./routes/profileRoutes'); 
// const adminRoutes = require('./routes/adminRoutes');
const { connectDB } = require('./config/db');
const User = require('./models/User');
const { hashPassword, comparePassword } = require('./utils/passwordUtils');
const { generateToken } = require('./utils/jwtUtils');
const PORT = process.env.PORT || 3000;
require('dotenv').config();
require('./config/passport');
//using  swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Define your API routes here
app.use('/api', authRoutes);

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/profiles', profileRoutes);
// app.use('/api/admin', adminRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/api/hello', (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('JWT_SECRET:', process.env.JWT_SECRET);
});
