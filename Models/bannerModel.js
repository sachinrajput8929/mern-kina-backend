const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bannerSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: false
    },
    bannerURL: {
        type: String,
        required: false
    },
    status: {
        type: String,
    }
}, {
    timestamps: true
});

const bannerModel = mongoose.model('Banner', bannerSchema);
module.exports = bannerModel;