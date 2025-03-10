// backend/routes/orders.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyToken } = require('../middleware/auth');

router.post('/', verifyToken, orderController.placeOrder);
router.get('/', verifyToken, orderController.getOrders);
router.get('/:id', verifyToken, orderController.getOrderById);
router.put('/:id', verifyToken, orderController.updateOrderStatus);

module.exports = router;
