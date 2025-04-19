// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, isSeller } = require('../middleware/auth');

console.log('adminController:', adminController);

router.get('/users', verifyToken, isSeller, adminController.getAllUsers);
router.get('/inventory', verifyToken, isSeller, adminController.getFullInventory);
router.get('/sales', verifyToken, isSeller, adminController.getSalesAnalytics);
router.get('/logs', verifyToken, isSeller, adminController.getSecurityLogs);
router.put('/users/:id', verifyToken, isSeller, adminController.updateUserRole);
router.get('/sales', verifyToken, isSeller, adminController.getSalesAnalytics);

module.exports = router;
