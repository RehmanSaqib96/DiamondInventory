// backend/controllers/diamondController.js
const csvParser = require('csv-parser');
const fs = require('fs');
const Diamond = require('../models/Diamond');

exports.getAllDiamondsPublic = async (req, res) => {
    try {
        const diamonds = await Diamond.findAll();
        res.json(diamonds);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching diamonds', error: error.message });
    }
};

exports.createDiamond = async (req, res) => {
    try {
        // Destructure diamond properties from the request body
        const { title, description, price, carat, color, clarity, cut, certification, status } = req.body;
        const sellerId = req.user.id;

        // If a file was uploaded, construct its URL; otherwise fall back to any provided imageUrl (or null)
        let imageUrl = req.body.imageUrl || null;
        if (req.file) {
            // Ensure your Express server has this static middleware:
            // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
            imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        // Create the diamond record with the imageUrl
        const diamond = await Diamond.create({
            title,
            description,
            price,
            carat,
            color,
            clarity,
            cut,
            certification,
            status,
            imageUrl,
            sellerId
        });

        res.status(201).json(diamond);
    } catch (error) {
        console.error('Error creating diamond:', error);
        res.status(500).json({ message: 'Error creating diamond', error: error.message });
    }
};

exports.getAllDiamonds = async (req, res) => {
    try {
        const diamonds = await Diamond.findAll();
        res.json(diamonds);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching diamonds', error });
    }
};

exports.getDiamondById = async (req, res) => {
    try {
        const diamond = await Diamond.findByPk(req.params.id);
        if (!diamond)
            return res.status(404).json({ message: 'Diamond not found' });
        res.json(diamond);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching diamond', error });
    }
};

exports.updateDiamond = async (req, res) => {
    try {
        const diamond = await Diamond.findByPk(req.params.id);
        if (!diamond)
            return res.status(404).json({ message: 'Diamond not found' });
        if (diamond.sellerId !== req.user.id)
            return res.status(403).json({ message: 'Not authorized to update this diamond' });
        await diamond.update(req.body);
        res.json(diamond);
    } catch (error) {
        res.status(500).json({ message: 'Error updating diamond', error });
    }
};

exports.deleteDiamond = async (req, res) => {
    try {
        const diamond = await Diamond.findByPk(req.params.id);
        if (!diamond)
            return res.status(404).json({ message: 'Diamond not found' });
        if (diamond.sellerId !== req.user.id)
            return res.status(403).json({ message: 'Not authorized to delete this diamond' });
        await diamond.destroy();
        res.json({ message: 'Diamond deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting diamond', error });
    }
};

exports.bulkUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'CSV file required' });
        }
        const results = [];
        fs.createReadStream(req.file.path)
            .pipe(csvParser())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                // Add sellerId to each record
                const diamondsData = results.map(record => ({
                    title: record.title,
                    description: record.description,
                    price: parseFloat(record.price),
                    carat: parseFloat(record.carat),
                    cut: record.cut,
                    color: record.color,
                    clarity: record.clarity,
                    sellerId: req.user.id,
                    certification: record.certification,
                    status: record.status,
                }));
                const createdDiamonds = await Promise.all(
                    diamondsData.map(data => Diamond.create(data))
                );
                res.status(201).json({ message: 'Bulk upload successful', diamonds: createdDiamonds });
            });
    } catch (error) {
        res.status(500).json({ message: 'Error during bulk upload', error });
    }
};
