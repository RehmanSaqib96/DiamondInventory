// backend/models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    role: { type: DataTypes.ENUM('admin', 'seller', 'buyer'), defaultValue: 'buyer' }
});

module.exports = User;
