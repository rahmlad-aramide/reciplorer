const { ShoppingListItem } = require('../models');

const getShoppingList = async (req, res) => {
  try {
    const items = await ShoppingListItem.findAll({ where: { userId: req.userId } });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shopping list', error: error.message });
  }
};

const addShoppingListItem = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const item = await ShoppingListItem.create({ name, quantity, userId: req.userId });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error adding shopping list item', error: error.message });
  }
};

const updateShoppingListItem = async (req, res) => {
  const { isPurchased } = req.body;
  try {
    const item = await ShoppingListItem.findOne({ where: { id: req.params.id, userId: req.userId } });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    await item.update({ isPurchased });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error: error.message });
  }
};

const deleteShoppingListItem = async (req, res) => {
  try {
    const item = await ShoppingListItem.findOne({ where: { id: req.params.id, userId: req.userId } });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    await item.destroy();
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error: error.message });
  }
};

module.exports = { getShoppingList, addShoppingListItem, updateShoppingListItem, deleteShoppingListItem };
