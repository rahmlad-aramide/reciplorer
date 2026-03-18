const express = require('express');
const router = express.Router();
const { getShoppingList, addShoppingListItem, updateShoppingListItem, deleteShoppingListItem } = require('../controllers/shoppingListController');
const authenticate = require('../middleware/auth');

router.get('/', authenticate, getShoppingList);
router.post('/', authenticate, addShoppingListItem);
router.put('/:id', authenticate, updateShoppingListItem);
router.delete('/:id', authenticate, deleteShoppingListItem);

module.exports = router;
