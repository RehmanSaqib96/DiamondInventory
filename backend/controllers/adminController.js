// backend/controllers/adminController.js
const User = require('../models/User');
const Diamond = require('../models/Diamond');
const Order = require('../models/Order');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

const updateUserRole = async (req, res) => {
    try {
        const userId = req.params.id;
        const { role } = req.body;
        if (!['customer', 'seller'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role provided' });
        }
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.role = role;
        await user.save();
        res.json({ message: 'User role updated successfully', user });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ message: 'Error updating user role', error: error.message });
    }
};

const getFullInventory = async (req, res) => {
    try {
        const diamonds = await Diamond.findAll();
        res.json(diamonds);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching inventory', error: error.message });
    }
};

const getSalesAnalytics = async (req, res) => {
    try {
        const orders = await Order.findAll();
        const totalSales = orders.length;
        res.json({ totalSales });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sales analytics', error: error.message });
    }
};

const getSecurityLogs = async (req, res) => {
    try {
        res.json([{ id: 1, action: 'User login', timestamp: new Date() }]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching logs', error: error.message });
    }
};

module.exports = {
    getAllUsers,
    updateUserRole,
    getFullInventory,
    getSalesAnalytics,
    getSecurityLogs,
};