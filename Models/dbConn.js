const mongoose = require('mongoose');
const dbURI = process.env.DB_URL

mongoose.connect(dbURI)
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.error('Database connection error:', error);
        process.exit(1);
    });
