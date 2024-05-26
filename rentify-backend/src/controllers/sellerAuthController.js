const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Seller = require('../models/seller');

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newSeller = new Seller({ username, password: hashedPassword });
        await newSeller.save();
        res.status(201).json({ message: 'Seller created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const seller = await Seller.findOne({ username });
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, seller.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ userId: seller._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { register, login };
