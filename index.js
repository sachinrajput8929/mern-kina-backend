const express = require('express');
const app = express();
require('dotenv').config();
require('./Models/dbConn');
const authRoutes = require('./Routes/authRoutes');
const proRoutes = require('./Routes/proRoutes');
const siteRoutes = require('./Routes/siteRoutes');
const bannerRoutes = require('./Routes/bannerRoutes');
const webuserRoutes = require('./Routes/webuserRoutes');
const cartRoutes = require('./Routes/cartRoutes');

const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', (req, res) => {
    res.send('Welcome to the backend server');
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth', authRoutes);
app.use('/product', proRoutes);
app.use('/site', siteRoutes);
app.use('/banner', bannerRoutes);
app.use('/cart', cartRoutes);




//website routes
app.use('/webuser',webuserRoutes);
 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

