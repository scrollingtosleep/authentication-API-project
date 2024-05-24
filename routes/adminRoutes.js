const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/adminMiddleware');

router.get('/users', authenticate, authorize, adminController.getAllUsers);
router.put('/users/:id', authenticate, authorize, adminController.updateUser);
router.delete('/users/:id', authenticate, authorize, adminController.deleteUser);

module.exports = router;
