// backend/models/Diamond.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Diamond = sequelize.define('Diamond', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    carat: DataTypes.FLOAT,
    color: DataTypes.STRING,
    clarity: DataTypes.STRING,
    sellerId: DataTypes.INTEGER
});

module.exports = Diamond;
