// backend/models/Diamond.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Diamond = sequelize.define('Diamond', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    cut: DataTypes.STRING,
    carat: DataTypes.FLOAT,
    color: DataTypes.STRING,
    clarity: DataTypes.STRING,
    sellerId: DataTypes.INTEGER,
    certification: {
        type: DataTypes.STRING,
        field: 'certifications'
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Available'
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Diamond;
