const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const siteSchema = new Schema({
    logo: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
     altemail: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
      altphone: {
        type: String,
        required: false
    },
    facebook: {
        type: String,
        required: false
    },
    instagram: {
        type: String,
        required: false
    },
    twitter: {
        type: String,
        required: false
    },
    linkedin: {
        type: String,
        required: false
    },
    youtube: {
        type: String,
        required: false
    },
    whatsapp: {
        type: String,
        required: false
    },
     map: {
        type: String,
        required: false
    },
    status: {
        type: String,
        default: 'active'
    }

}, {
    timestamps: true
});

const siteModels = mongoose.model('sitesetting', siteSchema);
module.exports = siteModels;    