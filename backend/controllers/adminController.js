// backend/controllers/adminController.js
const { Sequelize } = require('sequelize');
const { Op, fn, col, literal } = require('sequelize');
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
        // 1) Total number of orders placed
        const totalSales = await Order.count();

        // 2) Count diamonds by status
        const [
            soldDiamonds,
            availableDiamonds,
            reservedDiamonds
        ] = await Promise.all([
            Diamond.count({ where: { status: 'Sold' } }),
            Diamond.count({ where: { status: 'Available' } }),
            Diamond.count({ where: { status: 'Reserved' } }),
        ]);

        // 3) Category distribution (group by cut)
        const distRows = await Diamond.findAll({
            attributes: [
                'cut',
                [ fn('COUNT', col('id')), 'count' ]
            ],
            group: ['cut']
        });
        const categoryDistribution = distRows.reduce((acc, row) => {
            acc[row.get('cut')] = parseInt(row.get('count'), 10);
            return acc;
        }, {});

        // 4) Sales over time (group orders by month)
        const salesRows = await Order.findAll({
            attributes: [
                [ fn('date_trunc', 'month', col('createdAt')), 'month' ],
                [ fn('COUNT', col('id')), 'count' ]
            ],
            group: [ literal('month') ],
            order: [ [ literal('month'), 'ASC' ] ]
        });
        const salesOverTime = salesRows.map(r => ({
            month: r.get('month').toISOString().slice(0,7),  // "YYYY-MM"
            sales: parseInt(r.get('count'), 10)
        }));

        res.json({
            totalSales,
            soldDiamonds,
            availableDiamonds,
            reservedDiamonds,
            categoryDistribution,
            salesOverTime
        });

    } catch (error) {
        console.error('Error fetching sales analytics:', error);
        res.status(500).json({ message: 'Error fetching sales analytics', error: error.message });
    }
}

module.exports = {
    getAllUsers,
    updateUserRole,
    getFullInventory,
    getSecurityLogs,
    getSalesAnalytics,
};
