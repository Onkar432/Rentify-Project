const express = require('express');
const { getProperties } = require('../controllers/buyerPropertyController');
const authenticateBuyer = require('../middleware/authenticateBuyer');

const router = express.Router();

router.get('/buyer-properties', getProperties);

module.exports = router;
