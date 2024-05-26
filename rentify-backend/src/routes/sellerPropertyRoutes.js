const express = require('express');
const { addProperty, getProperties, deleteProperty } = require('../controllers/sellerPropertyController');
const authenticateSeller = require('../middleware/authenticateSeller');

const router = express.Router();

router.post('/properties', authenticateSeller, addProperty);
router.get('/properties', authenticateSeller, getProperties);
router.delete('/properties/:id', authenticateSeller, deleteProperty);

module.exports = router;
