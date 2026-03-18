const { PantryItem } = require('../models');

const getPantry = async (req, res) => {
  try {
    const items = await PantryItem.findAll({ where: { userId: req.userId } });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pantry', error: error.message });
  }
};

const addPantryItem = async (req, res) => {
  const { name, quantity, expiryDate } = req.body;
  try {
    const item = await PantryItem.create({ name, quantity, expiryDate, userId: req.userId });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error adding pantry item', error: error.message });
  }
};

const deletePantryItem = async (req, res) => {
  try {
    const item = await PantryItem.findOne({ where: { id: req.params.id, userId: req.userId } });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    await item.destroy();
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pantry item', error: error.message });
  }
};

module.exports = { getPantry, addPantryItem, deletePantryItem };
