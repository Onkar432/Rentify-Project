const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }]
});

module.exports = mongoose.model('Seller', sellerSchema);
