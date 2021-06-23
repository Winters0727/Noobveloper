const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    userPassword: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    userEmail: {
        type: String,
        unique: true,
    },
    profileImage: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model('Account', accountSchema);