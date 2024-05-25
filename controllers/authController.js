const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/passwordUtils');
const { generateToken, verifyToken } = require('../utils/jwtUtils');

exports.register = async (req, res) => {
  try {
    const { name, email, password, photo, bio, phone, isPublic, isAdmin } = req.body;

    // Check if email is valid
    if (!email.includes('@')) {
      return res.status(400).json({ message: 'Please check your email address' });
    }

    // Set the user's role based on isAdmin
    const role = isAdmin ? 'admin' : 'user';

    const hashedPassword = await hashPassword(password);
    const user = new User({ name, email, password: hashedPassword, photo, bio, phone, isPublic, role });
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

    // Check if email is valid
    if (!email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

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

    // Return user details along with the token and message
    res.json({ token, message, user });
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
      const token = generateToken({ userId: user._id, role: user.role });

      res.status(201).json({ message: 'User registered successfully', token });
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
    const { name, photo, bio, phone, email, currentPassword, newPassword, confirmPassword } = req.body;
    
    // Check if email is valid
    if (!email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email address' });
    }
    
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update profile information
    user.name = name || user.name;
    user.photo = photo || user.photo;
    user.bio = bio || user.bio;
    user.phone = phone || user.phone;
    user.email = email || user.email;
    
    // Change password if provided
    if (currentPassword && newPassword && confirmPassword) {
      //if the current password matches the stored password
      const isMatch = await comparePassword(currentPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Current password is incorrect as stored in Database' });
      }
      
      //if the new password and confirm password match
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'New password and confirm password do not match' });
      }
      //if the newPassword matches with oldPassword
      if (newPassword === user.password) {
        return res.status(400).json({ message: 'New password cannot be thepassword do not match' });
      }
      
      // Hash the new password and update the user's password
      user.password = await hashPassword(newPassword);
    }
    const message = "User Details Updated Successfully!"
    
    await user.save();
    res.json(message, user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
