// backend/middleware/logger.js
const fs = require('fs');
const path = require('path');

exports.logAction = (action) => (req, res, next) => {
    const logEntry = {
        user: req.user.id,
        role: req.user.role,
        action,
        endpoint: req.originalUrl,
        timestamp: new Date()
    };
    const logFile = path.join(__dirname, '../logs/security.log');
    fs.appendFile(logFile, JSON.stringify(logEntry) + "\n", err => {
        if (err) console.error('Error logging action', err);
    });
    next();
};
