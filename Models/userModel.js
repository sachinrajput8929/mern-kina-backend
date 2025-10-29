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
     loginrole: {
        type: String,
    },
     status: {
        type: String,
    }
}, {
    timestamps: true
});

const UserModels = mongoose.model('users', userSchema);
module.exports = UserModels;    