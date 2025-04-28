const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Diamond = require('./Diamond');

const Wishlist = sequelize.define('Wishlist', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    buyerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    diamondId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Wishlist.belongsTo(Diamond, { foreignKey: 'diamondId', as: 'diamond' });

module.exports = Wishlist;
