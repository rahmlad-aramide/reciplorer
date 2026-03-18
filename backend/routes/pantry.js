const express = require('express');
const router = express.Router();
const { getPantry, addPantryItem, deletePantryItem } = require('../controllers/pantryController');
const authenticate = require('../middleware/auth');

router.get('/', authenticate, getPantry);
router.post('/', authenticate, addPantryItem);
router.delete('/:id', authenticate, deletePantryItem);

module.exports = router;
