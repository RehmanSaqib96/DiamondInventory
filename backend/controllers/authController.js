// backend/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your_jwt_refresh_secret';
const transporter = require('../config/email');
const crypto = require('crypto');

// In-memory store for refresh tokens (for demo purposes)
const refreshTokens = [];

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'customer',
        });

        // Send welcome email (html + text in one go)
        transporter.sendMail({
            from:    `"DiamondStore" <no-reply@${process.env.MAILGUN_DOMAIN}>`,
            to:      email,
            subject: 'Welcome to DiamondStore!',
            text:    `Hello ${name},\n\nThanks for signing up at DiamondStore. We’re thrilled to have you!\n\nHappy browsing,\nDiamondStore Team`,
            html:    `
        <h1>Hello ${name},</h1>
        <p>Thanks for signing up at <strong>DiamondStore</strong>. We’re thrilled to have you!</p>
        <p>Feel free to browse our listings and let us know if you have any questions.</p>
        <p>Happy browsing,<br/>DiamondStore Team</p>
      `
        }, (err, info) => {
            if (err) console.error('Welcome email failed:', err);
            else    console.log('Welcome email sent:', info.response);
        });

        // Single response to the client
        return res.status(201).json({
            message: 'Registration successful',
            user: {
                id:    user.id,
                name:  user.name,
                email: user.email,
                role:  user.role
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Email already exists' });
        }
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

        // 2. Compare the provided password with the hashed password in DB
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 3. Generate JWT (ensure that JWT_SECRET is the same as used in your verifyToken middleware)
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        // 4. Return the token and the user object, including the name
        res.json({
            accessToken: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in' });
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

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            // don't reveal that the email isn't registered
            return res.json({ message: 'If that email is registered, you’ll get a reset link.' });
        }

        // generate token + expiry (1 hour)
        const token = crypto.randomBytes(32).toString('hex');
        const expiry = Date.now() + 3600_000;

        user.resetToken = token;
        user.resetTokenExpiry = expiry;
        await user.save();

        // TODO: send email containing link:
        //   https://your-frontend.com/reset-password/${token}
        console.log(`RESET LINK: http://localhost:3000/reset-password/${token}`);

        res.json({ message: 'If that email is registered, you’ll get a reset link.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error processing forgot password', error: err.message });
    }
};

/**
 * POST /auth/reset-password
 * { token, newPassword }
 */
exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const user = await User.findOne({
            where: {
                resetToken: token,
                resetTokenExpiry: { [Op.gt]: Date.now() }
            }
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token.' });
        }

        // hash & save
        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await user.save();

        res.json({ message: 'Password has been reset. You may now log in.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error resetting password', error: err.message });
    }
};