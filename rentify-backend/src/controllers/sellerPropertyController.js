const Seller = require('../models/seller');
const Property = require('../models/property');
// Add a property
const addProperty = async (req, res) => {
    try {
        const { place, area, bedrooms, bathrooms, hospitalsNearby, collegesNearby } = req.body;
        const sellerId = req.seller._id; // Assuming req.seller is set after authentication

        const newProperty = new Property({
            place,
            area,
            bedrooms,
            bathrooms,
            hospitalsNearby,
            collegesNearby,
            seller: sellerId
        });

        await newProperty.save();

        res.status(201).json(newProperty);
    } catch (error) {
        console.error('Error adding property:', error);
        res.status(500).json({ error: error.message });
    }
};
// Get properties of the seller
const getProperties = async (req, res) => {
    console.log('req is', req)
    try {
        // Check if req.seller is defined and contains the _id property
        if (!req.seller || !req.seller._id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const sellerId = req.seller._id;
        const seller = await Seller.findById(sellerId).populate('properties');

        if (!seller) {
            return res.status(404).json({ error: 'Seller not found' });
        }

        res.status(200).json(seller.properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a property
const deleteProperty = async (req, res) => {
    try {
        const propertyId = req.params.id;
        const sellerId = req.seller._id; // Assuming req.seller is set after authentication

        const seller = await Seller.findById(sellerId);
        const propertyIndex = seller.properties.findIndex(prop => prop._id.equals(propertyId));

        if (propertyIndex === -1) {
            return res.status(404).json({ message: 'Property not found' });
        }

        seller.properties.splice(propertyIndex, 1);
        await seller.save();

        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
        console.error('Error deleting property:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addProperty, getProperties, deleteProperty };
