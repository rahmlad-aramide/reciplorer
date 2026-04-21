const { Op } = require('sequelize');
const { Recipe, User, PantryItem } = require('../models');

const getAllRecipes = async (req, res) => {
  const { category, cuisine, difficulty, maxTime, whatIHave, region, ingredient } = req.query;
  const where = { isPublic: true };

  if (category) where.category = category;
  if (cuisine) where.cuisine = cuisine;
  if (difficulty) where.difficulty = difficulty;
  if (maxTime) where.cookingTime = { [Op.lte]: parseInt(maxTime) };

  if (region) {
    // Basic region mapping
    where.cuisine = region;
  }

  if (ingredient) {
    where[Op.or] = [
      { instructions: { [Op.like]: `%${ingredient}%` } },
      { description: { [Op.like]: `%${ingredient}%` } }
    ];
  }

  try {
    let recipes = await Recipe.findAll({ where, include: { model: User, as: 'author', attributes: ['username'] } });

    if (whatIHave === 'true' && req.userId) {
      const pantryItems = await PantryItem.findAll({ where: { userId: req.userId } });
      const pantryItemNames = pantryItems.map(item => item.name.toLowerCase());

      recipes = recipes.filter(recipe => {
        // This is a simplified check: does the instructions or description contain any pantry item?
        // In a real app, you'd have a separate Ingredients table
        const content = (recipe.instructions + ' ' + recipe.description).toLowerCase();
        return pantryItemNames.some(itemName => content.includes(itemName));
      });
    }

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id, { include: { model: User, as: 'author', attributes: ['username'] } });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipe', error: error.message });
  }
};

const createRecipe = async (req, res) => {
  const { title, description, instructions, category, cuisine, difficulty, cookingTime, calories, protein, carbs, fats, image } = req.body;

  try {
    const recipe = await Recipe.create({
      title,
      description,
      instructions,
      category,
      cuisine,
      difficulty,
      cookingTime,
      calories,
      protein,
      carbs,
      fats,
      image,
      authorId: req.userId,
    });
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error creating recipe', error: error.message });
  }
};

module.exports = { getAllRecipes, getRecipeById, createRecipe };
