// backend/controllers/adminController.js
const User = require('../models/User');
const Diamond = require('../models/Diamond');
const Order = require('../models/Order');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

exports.getFullInventory = async (req, res) => {
    try {
        const diamonds = await Diamond.findAll();
        res.json(diamonds);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching inventory', error });
    }
};

exports.getSalesAnalytics = async (req, res) => {
    try {
        const orders = await Order.findAll();
        // Simplified example: total orders count as total sales.
        const totalSales = orders.length;
        res.json({ totalSales });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sales analytics', error });
    }
};

exports.getSecurityLogs = async (req, res) => {
    try {
        // Dummy logs for demonstration.
        res.json([{ id: 1, action: 'User login', timestamp: new Date() }]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching logs', error });
    }
};
