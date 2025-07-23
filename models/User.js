const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String }
}, {
    timestamps: true //for createdAt and updatedAt
});

module.exports = mongoose.model('User', userSchema);