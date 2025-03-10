// backend/controllers/wishlistController.js
const Wishlist = require('../models/Wishlist');

exports.addToWishlist = async (req, res) => {
    try {
        const buyerId = req.user.id;
        const diamondId = req.params.diamondId;
        const wishlistItem = await Wishlist.create({ buyerId, diamondId });
        res.status(201).json(wishlistItem);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to wishlist', error });
    }
};

exports.getWishlist = async (req, res) => {
    try {
        const buyerId = req.user.id;
        const wishlistItems = await Wishlist.findAll({ where: { buyerId } });
        res.json(wishlistItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching wishlist', error });
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        const buyerId = req.user.id;
        const diamondId = req.params.diamondId;
        await Wishlist.destroy({ where: { buyerId, diamondId } });
        res.json({ message: 'Removed from wishlist' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing from wishlist', error });
    }
};
