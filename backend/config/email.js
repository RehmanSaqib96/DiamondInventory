// config/email.js
const nodemailer = require('nodemailer');
require('dotenv').config(); // Ensure your .env variables are loaded

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10), // Convert to number
    secure: process.env.EMAIL_SECURE === 'true', // Boolean value
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Optional: Verify connection configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('Email transporter error:', error);
    } else {
        console.log('Email transporter is ready to send messages');
    }
});

module.exports = transporter;
