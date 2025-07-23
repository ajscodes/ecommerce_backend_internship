const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
}, {
    timestamps: true //for createdAt and updatedAt
});

module.exports = mongoose.Schema('Product', productSchema);