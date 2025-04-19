// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, isSeller } = require('../middleware/auth');
const { logAction } = require('../middleware/logger');

router.get('/users', verifyToken, isSeller, logAction('View Users'), adminController.getAllUsers);
router.get('/inventory', verifyToken, isSeller, logAction('View Inventory'), adminController.getFullInventory);
router.get('/sales', verifyToken, isSeller, logAction('View Sales Analytics'), adminController.getSalesAnalytics);
router.get('/logs', verifyToken, isSeller, logAction('View Security Logs'), adminController.getSecurityLogs);
router.put('/users/:id', verifyToken, isSeller, adminController.updateUserRole);
router.get('/sales', verifyToken, isSeller, adminController.getSalesAnalytics);

module.exports = router;
