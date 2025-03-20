// backend/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your_jwt_refresh_secret';
const transporter = require('../config/email');

// In-memory store for refresh tokens (for demo purposes)
const refreshTokens = [];

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validate inputs if needed
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in DB
        await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'customer'  // or omit 'role' if you rely on defaultValue
        });


        // Send confirmation email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to DiamondStore!',
            text: `Hello ${name},\n\nThank you for registering at DiamondStore.\n\nBest Regards,\nDiamondStore Team`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending email:', err);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);

        // Check for unique constraint (duplicate email)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Return a generic 500 if something else goes wrong
        return res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // 1. Find the user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        console.log("Stored password:", user.password);
        console.log("Entered password:", password);
        console.log("Stored password from DB:", user.password);
        console.log("Entered password (should be plain text):", password);

        // 2. Compare the provided password with the hashed password in DB
        const match = await bcrypt.compare(password, user.password);
        console.log("Password Match:", match);
        if (!match) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 3. If matched, generate JWT or set session
        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ accessToken: token, user: { id: user.id, email: user.email, role: user.role } });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Error logging in' });
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
