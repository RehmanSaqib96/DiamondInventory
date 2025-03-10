// backend/models/Wishlist.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Wishlist = sequelize.define('Wishlist', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    buyerId: DataTypes.INTEGER,
    diamondId: DataTypes.INTEGER
});

module.exports = Wishlist;
