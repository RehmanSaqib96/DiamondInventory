// backend/models/Inquiry.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Inquiry = sequelize.define('Inquiry', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    diamondTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    diamondDescription: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    contactMessage: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    buyerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    buyerEmail: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Inquiry;
