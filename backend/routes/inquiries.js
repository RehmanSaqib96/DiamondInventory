// backend/routes/index.js
const express = require('express');
const router = express.Router();
const { verifyToken, isSeller } = require('../middleware/auth');
const Inquiry = require('../models/Inquiry');

// POST /inquiries: For buyers to submit an inquiry
router.post('/', verifyToken, async (req, res) => {
    try {
        const { diamondTitle, diamondDescription, contactMessage, imageUrl } = req.body;
        const buyerId = req.user.id;
        const buyerEmail = req.user.email;

        const inquiry = await Inquiry.create({
            diamondTitle,
            diamondDescription,
            contactMessage,
            imageUrl,
            buyerId,
            buyerEmail
        });
        res.status(201).json(inquiry);
    } catch (error) {
        console.error('Error creating inquiry:', error);
        res.status(500).json({ message: 'Error creating inquiry', error: error.message });
    }
});

// GET /inquiries: For admin (seller) to view buyer inquiries
router.get('/', verifyToken, isSeller, async (req, res) => {
    try {
        const inquiries = await Inquiry.findAll({ order: [['createdAt', 'DESC']] });
        res.json(inquiries);
    } catch (error) {
        console.error('Error fetching inquiries:', error);
        res.status(500).json({ message: 'Error fetching inquiries', error: error.message });
    }
});

// GET /inquiries/:id: For admin (seller) to view a single inquiry
router.get('/:id', verifyToken, isSeller, async (req, res) => {
    try {
        const inquiryId = req.params.id;
        const inquiry = await Inquiry.findByPk(inquiryId);
        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }
        res.json(inquiry);
    } catch (error) {
        console.error('Error fetching inquiry:', error);
        res.status(500).json({ message: 'Error fetching inquiry', error: error.message });
    }
});

module.exports = router;
