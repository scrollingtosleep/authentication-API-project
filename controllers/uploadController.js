const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Create the Multer upload instance
const upload = multer({ storage });

exports.uploadImage = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Update the user's photo field with the uploaded image path
    user.photo = req.file.path;
    await user.save();

    res.json({ message: 'Image uploaded successfully', imageUrl: req.file.path });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.upload = upload.single('image');
