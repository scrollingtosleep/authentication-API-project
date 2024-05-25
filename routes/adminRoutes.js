const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authenticate, authorize } = require('../middleware/adminMiddleware');

router.get('/profiles', authenticate, authorize, profileController.getAllProfiles);
router.get('/profiles/:id', authenticate, authorize, profileController.getProfile);

module.exports = router;
