// backend/routes/diamonds.js
const express = require('express');
const router = express.Router();
const diamondController = require('../controllers/diamondController');
const { verifyToken, isSeller } = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// PUBLIC: For homepage listing
router.get('/public', diamondController.getAllDiamondsPublic);
router.get('/:id', diamondController.getDiamondById);

// PROTECTED: Seller endpoints
router.post('/', verifyToken, isSeller, diamondController.createDiamond);
router.get('/', verifyToken, diamondController.getAllDiamonds); // if you want sellers to see them
router.put('/:id', verifyToken, isSeller, diamondController.updateDiamond);
router.delete('/:id', verifyToken, isSeller, diamondController.deleteDiamond);
router.post('/bulk-upload', verifyToken, isSeller, upload.single('file'), diamondController.bulkUpload);

module.exports = router;
