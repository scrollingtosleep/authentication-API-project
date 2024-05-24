const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/passwordUtils');
const { generateToken, verifyToken } = require('../utils/jwtUtils');

exports.register = async (req, res) => {
  try {
    const { name, email, password, photo, bio, phone, isPublic } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = new User({ name, email, password: hashedPassword, photo, bio, phone, isPublic });
    await user.save();
    const token = generateToken({ userId: user._id, role: user.role });
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
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
    const message = "User LoggedIn Successfully";
    res.json({ token, message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    // Implement logout functionality here
    res.json({ message: 'User logged out successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (req.user.role === 'admin' || user.isPublic) {
      res.json(user);
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, photo, bio, phone, password, isPublic } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.name = name || user.name;
    user.photo = photo || user.photo;
    user.bio = bio || user.bio;
    user.phone = phone || user.phone;
    user.isPublic = isPublic !== undefined ? isPublic : user.isPublic;
    if (password) {
      user.password = await hashPassword(password);
    }
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
