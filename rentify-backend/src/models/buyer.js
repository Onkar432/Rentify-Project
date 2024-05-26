// src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }]

});

module.exports = mongoose.model('Buyer', userSchema);
