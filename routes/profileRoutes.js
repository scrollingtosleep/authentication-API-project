const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/', authenticate, profileController.getPublicProfiles);
router.get('/:id', authenticate, profileController.getProfile);

module.exports = router;
 