// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middleware/auth');
const { logAction } = require('../middleware/logger');

router.get('/users', verifyToken, isAdmin, logAction('View Users'), adminController.getAllUsers);
router.get('/inventory', verifyToken, isAdmin, logAction('View Inventory'), adminController.getFullInventory);
router.get('/sales', verifyToken, isAdmin, logAction('View Sales Analytics'), adminController.getSalesAnalytics);
router.get('/logs', verifyToken, isAdmin, logAction('View Security Logs'), adminController.getSecurityLogs);
router.put('/users/:id', verifyToken, isAdmin, adminController.updateUserRole);
module.exports = router;
