const Buyer = require('../models/buyer');

// Controller function to get properties for a buyer
const getProperties = async (req, res) => {
    try {
        const buyerId = req.buyer._id; // Assuming req.buyer is set after authentication
        const buyer = await Buyer.findById(buyerId).populate('properties');
        res.status(200).json(buyer.properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getProperties };
