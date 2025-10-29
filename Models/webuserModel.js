const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
     phone: {
        type: String,
    },
     role: {
        type: String,
    },
     status: {
        type: String,
    }
}, {
    timestamps: true
});

const UserModels = mongoose.model('webusers', userSchema);
module.exports = UserModels;    