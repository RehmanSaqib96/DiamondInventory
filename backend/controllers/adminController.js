// backend/controllers/adminController.js
const User    = require('../models/User');
const Diamond = require('../models/Diamond');
const Order   = require('../models/Order');

async function getAllUsers(req, res) {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
}

async function updateUserRole(req, res) {
    try {
        const userId = req.params.id;
        const { role } = req.body;
        if (!['customer','seller','admin'].includes(role)) {
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
}

async function getFullInventory(req, res) {
    try {
        const diamonds = await Diamond.findAll();
        res.json(diamonds);
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({ message: 'Error fetching inventory', error: error.message });
    }
}

async function getSecurityLogs(req, res) {
    try {
        // stubbed for now
        res.json([{ id: 1, action: 'User login', timestamp: new Date() }]);
    } catch (error) {
        console.error('Error fetching logs:', error);
        res.status(500).json({ message: 'Error fetching logs', error: error.message });
    }
}

async function getSalesAnalytics(req, res) {
    try {
        const analyticsData = {
            totalSales: 50,
            soldDiamonds: 20,
            availableDiamonds: 25,
            reservedDiamonds: 5,
            categoryDistribution: {
                Brilliant: 15,
                Princess: 10,
                Emerald: 8,
                Oval: 7,
                Radiant: 5,
            },
            salesOverTime: [
                { month: "January",   sales: 5 },
                { month: "February",  sales: 8 },
                { month: "March",     sales: 10 },
                { month: "April",     sales: 12 },
                { month: "May",       sales: 7 },
                { month: "June",      sales: 8 }
            ]
        };
        res.json(analyticsData);
    } catch (error) {
        console.error('Error fetching sales analytics:', error);
        res.status(500).json({ message: 'Error fetching sales analytics', error: error.message });
    }
}

module.exports = {
    getAllUsers,
    updateUserRole,
    getFullInventory,
    getSalesAnalytics,
    getSecurityLogs,
};
