// backend/routes/wishlist.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const Wishlist = require('../models/Wishlist');
const Diamond = require('../models/Diamond');

// GET /wishlist - Return wishlist items for the logged-in user
router.get('/', verifyToken, async (req, res) => {
    try {
        const buyerId = req.user.id;
        // Include the associated diamond details
        const wishlistItems = await Wishlist.findAll({
            where: { buyerId },
            include: [{ model: Diamond, as: 'diamond' }]
        });
        res.json(wishlistItems);
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        res.status(500).json({ message: 'Error fetching wishlist', error: error.message });
    }
});

// POST /wishlist/:id - Add a diamond (by id) to the wishlist
router.post('/:id', verifyToken, async (req, res) => {
    try {
        const buyerId = req.user.id;
        const diamondId = parseInt(req.params.id, 10);
        if (isNaN(diamondId)) {
            return res.status(400).json({ message: 'Invalid diamond id' });
        }
        // Check if the diamond is already in the wishlist
        const exists = await Wishlist.findOne({ where: { buyerId, diamondId } });
        if (exists) {
            return res.status(400).json({ message: 'Diamond already in wishlist' });
        }
        const newItem = await Wishlist.create({ buyerId, diamondId });
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error adding diamond to wishlist:', error);
        res.status(500).json({ message: 'Error adding diamond to wishlist', error: error.message });
    }
});

// DELETE /wishlist/:id - Remove a diamond (by id) from the wishlist
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const buyerId = req.user.id;
        const diamondId = parseInt(req.params.id, 10);
        if (isNaN(diamondId)) {
            return res.status(400).json({ message: 'Invalid diamond id' });
        }
        const deleted = await Wishlist.destroy({ where: { buyerId, diamondId } });
        if (deleted) {
            res.json({ message: 'Diamond removed from wishlist' });
        } else {
            res.status(404).json({ message: 'Diamond not found in wishlist' });
        }
    } catch (error) {
        console.error('Error removing diamond from wishlist:', error);
        res.status(500).json({ message: 'Error removing diamond from wishlist', error: error.message });
    }
});

module.exports = router;
