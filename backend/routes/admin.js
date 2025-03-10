// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.get('/users', verifyToken, isAdmin, adminController.getAllUsers);
router.get('/inventory', verifyToken, isAdmin, adminController.getFullInventory);
router.get('/sales', verifyToken, isAdmin, adminController.getSalesAnalytics);
router.get('/logs', verifyToken, isAdmin, adminController.getSecurityLogs);

module.exports = router;
