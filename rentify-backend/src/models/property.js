// property.js
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    place: { type: String, required: true },
    area: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    hospitalsNearby: { type: String, required: true },
    collegesNearby: { type: String, required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true }
});

module.exports = mongoose.model('Property', propertySchema);
