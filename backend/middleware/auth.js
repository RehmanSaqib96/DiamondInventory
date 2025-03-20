// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

exports.verifyToken = (req, res, next) => {
    console.log("Incoming headers:", req.headers); // Debug: log all headers

    // Use lowercase key since Express normalizes headers to lowercase
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        console.error("No token provided. Headers:", req.headers);
        return res.status(401).json({ message: 'No token provided' });
    }

    // Expect header to be in format: "Bearer <token>"
    const token = authHeader.split(' ')[1];
    if (!token) {
        console.error("Bearer token missing:", authHeader);
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("JWT verification error:", err);
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded;
        next();
    });
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
