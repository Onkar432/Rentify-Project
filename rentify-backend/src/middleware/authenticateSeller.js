const jwt = require('jsonwebtoken');
const Seller = require('../models/seller');

const authenticateSeller = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: 'Authentication failed!' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const seller = await Seller.findById(decoded.userId);
        if (!seller) {
            return res.status(401).json({ message: 'Authentication failed!' });
        }
        req.seller = seller;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed!' });
    }
};

module.exports = authenticateSeller;
