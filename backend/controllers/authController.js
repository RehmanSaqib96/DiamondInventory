// backend/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your_jwt_refresh_secret';

// In-memory store for refresh tokens (for demo purposes)
const refreshTokens = [];

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields required' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword, role });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: 'Email and password required' });
        const user = await User.findOne({ where: { email } });
        if (!user)
            return res.status(400).json({ message: 'User not found' });
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(401).json({ message: 'Invalid credentials' });
        const accessToken = jwt.sign(
            { id: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            { id: user.id, role: user.role },
            JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
        );
        refreshTokens.push(refreshToken);
        res.json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

exports.refreshToken = (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: 'No token provided' });
    if (!refreshTokens.includes(token)) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }
    jwt.verify(token, JWT_REFRESH_SECRET, (err, userData) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        const newAccessToken = jwt.sign(
            { id: userData.id, role: userData.role },
            JWT_SECRET,
            { expiresIn: '15m' }
        );
        res.json({ accessToken: newAccessToken });
    });
};

exports.logout = (req, res) => {
    // Remove refresh token from store
    const { token } = req.body;
    const index = refreshTokens.indexOf(token);
    if (index > -1) refreshTokens.splice(index, 1);
    res.json({ message: 'Logout successful' });
};
