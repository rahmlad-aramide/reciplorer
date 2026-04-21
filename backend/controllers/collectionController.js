const { Collection, Recipe } = require('../models');

exports.createCollection = async (req, res) => {
  try {
    const { name, description } = req.body;
    const collection = await Collection.create({
      name,
      description,
      UserId: req.userId,
    });
    res.status(201).json(collection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCollections = async (req, res) => {
  try {
    const collections = await Collection.findAll({
      where: { UserId: req.userId },
      include: [Recipe],
    });
    res.json(collections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addRecipeToCollection = async (req, res) => {
  try {
    const { collectionId, recipeId } = req.params;
    const collection = await Collection.findOne({
      where: { id: collectionId, UserId: req.userId },
    });
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    await collection.addRecipe(recipe);
    res.json({ message: 'Recipe added to collection' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
