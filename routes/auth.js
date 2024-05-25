// const express = require('express');
// const passport = require('passport');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const User = require('../models/User');

// const router = express.Router();

// // Register route
// router.post('/register', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const user = new User({ name, email });
//     user.password = await bcrypt.hash(password, 10);
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Login route
// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', (err, user, info) => {
//     if (err) return next(err);
//     if (!user) return res.status(401).json({ message: info.message });
//     req.logIn(user, (err) => {
//       if (err) return next(err);
//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//       res.json({ token });
//     });
//   })(req, res, next);
// });

// module.exports = router;