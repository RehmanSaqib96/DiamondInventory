// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'No token provided' });
    jwt.verify(token.split(' ')[1], JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Failed to authenticate token' });
        req.user = decoded;
        next();
    });
};

exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin')
        return res.status(403).json({ message: 'Requires admin role' });
    next();
};

exports.isSeller = (req, res, next) => {
    if (req.user.role !== 'seller')
        return res.status(403).json({ message: 'Requires seller role' });
    next();
};

exports.isBuyer = (req, res, next) => {
    if (req.user.role !== 'buyer')
        return res.status(403).json({ message: 'Requires buyer role' });
    next();
};
