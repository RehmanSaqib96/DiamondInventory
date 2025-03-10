// backend/routes/diamonds.js
const express = require('express');
const router = express.Router();
const diamondController = require('../controllers/diamondController');
const { verifyToken, isSeller } = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', verifyToken, isSeller, diamondController.createDiamond);
router.get('/', verifyToken, diamondController.getAllDiamonds);
router.get('/:id', verifyToken, diamondController.getDiamondById);
router.put('/:id', verifyToken, isSeller, diamondController.updateDiamond);
router.delete('/:id', verifyToken, isSeller, diamondController.deleteDiamond);
// New bulk upload route
router.post('/bulk-upload', verifyToken, isSeller, upload.single('file'), diamondController.bulkUpload);

module.exports = router;
