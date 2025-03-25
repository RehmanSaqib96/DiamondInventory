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
    certification: {  // Model property is singular
        type: DataTypes.STRING,
        field: 'certifications'  // Maps to the plural column in DB
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Available'
    },
});

module.exports = Diamond;
