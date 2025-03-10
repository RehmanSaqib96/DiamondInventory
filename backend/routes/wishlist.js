// backend/routes/wishlist.js
const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const { verifyToken, isBuyer } = require('../middleware/auth');

router.post('/:diamondId', verifyToken, isBuyer, wishlistController.addToWishlist);
router.get('/', verifyToken, isBuyer, wishlistController.getWishlist);
router.delete('/:diamondId', verifyToken, isBuyer, wishlistController.removeFromWishlist);

module.exports = router;
