const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
    dialect: 'postgres',
});

// Test connection
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('DB connection error:', err));

module.exports = sequelize;
