// authenticateBuyer.js
const jwt = require('jsonwebtoken');
const Buyer = require('../models/buyer');

const authenticateBuyer = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: 'Authentication failed!' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const buyer = await Buyer.findById(decoded.userId);
        if (!buyer) {
            return res.status(401).json({ message: 'Authentication failed!' });
        }
        req.buyer = buyer;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed!' });
    }
};

module.exports = authenticateBuyer;
