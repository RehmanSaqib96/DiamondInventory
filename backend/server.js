// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const app = express();
const port = process.env.PORT || 5000;

// Import routes
const authRoutes = require('./routes/auth');
const diamondRoutes = require('./routes/diamonds');
const orderRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');
const inquiriesRoutes = require('./routes/inquiries');
const wishlistRoutes = require('./routes/wishlist');

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/auth', authRoutes);
app.use('/diamonds', diamondRoutes);
app.use('/orders', orderRoutes);
app.use('/admin', adminRoutes);
app.use('/upload', require('./routes/upload'));
app.use('/inquiries', inquiriesRoutes);
app.use('/wishlist', wishlistRoutes);

// Test DB connection & sync models
sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error:', err));

sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Sync error:', err));

sequelize.sync()
    .then(() => console.log('Models synced'))
    .catch(err => console.error('Sync error:', err));

app.listen(port, () => console.log(`Server running on port ${port}`));
