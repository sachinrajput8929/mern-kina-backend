const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const proSchema = new Schema({
    name: {
        type: String,
        required: false
    }, image: {
        type: String,
        required: false
    }, price: {
        type: String,
        required: false
    },

    dressNumber: {
        type: String,
        required: false
    },
    desc: {
        type: String,
        required: false
    },
    size: {
        type: String,
        required: false
    },
    length: {
        type: String,
        required: false
    },
    sleevs: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: false
    },
    fabric: {
        type: String,
        required: false
    },
    styleCode: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false
    },

    status: {
        type: String,
    }
}, {
    timestamps: true
});

const proModels = mongoose.model('products', proSchema);
module.exports = proModels;    