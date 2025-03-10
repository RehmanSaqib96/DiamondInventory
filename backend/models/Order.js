// backend/models/Order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    diamondId: DataTypes.INTEGER,
    buyerId: DataTypes.INTEGER,
    status: { type: DataTypes.ENUM('pending', 'confirmed', 'shipped', 'delivered'), defaultValue: 'pending' },
    orderDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Order;
