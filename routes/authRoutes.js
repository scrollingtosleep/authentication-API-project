const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');
const uploadController = require('../controllers/uploadController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authenticate, authController.logout); 
router.get('/profile', authenticate, authController.getProfile);
router.get('/getPublicProfiles', authController.getPublicProfiles);
router.get('/getAllProfiles', authController.getAllProfiles);
router.put('/updateProfile', authenticate, authController.updateProfile);
router.post('/upload/:userId', authenticate, uploadController.upload, uploadController.uploadImage);


module.exports = router;

