// config/email.js
const nodemailer = require('nodemailer');
const mg       = require('nodemailer-mailgun-transport');
require('dotenv').config();

const auth = {
    auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain:  process.env.MAILGUN_DOMAIN,
    }
};

const transporter = nodemailer.createTransport(mg(auth));

transporter.verify((err, success) => {
    if (err) console.error('Mailgun transporter error:', err);
    else    console.log('Mailgun transporter ready');
});

module.exports = transporter;
