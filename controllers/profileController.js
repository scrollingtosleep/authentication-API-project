const User = require('../models/User');

exports.getPublicProfiles = async (req, res) => {
  try {
    const profiles = await User.find({ isPublic: true }, { name: 1, photo: 1 });
    res.json(profiles);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.isPublic || req.user.role === 'admin') {
      res.json(user);
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await User.find({}, { name: 1, photo: 1, isPublic: 1 });
    res.json(profiles);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
