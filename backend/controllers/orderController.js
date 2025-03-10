// backend/controllers/orderController.js
const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
    try {
        const { diamondId } = req.body;
        const buyerId = req.user.id;
        const order = await Order.create({ diamondId, buyerId });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error placing order', error });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        // For simplicity, fetch orders by buyer.
        const orders = await Order.findAll({ where: { buyerId: userId } });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order)
            return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order)
            return res.status(404).json({ message: 'Order not found' });
        // (Additional authorization can be added here for sellers.)
        await order.update({ status: req.body.status });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error });
    }
};
