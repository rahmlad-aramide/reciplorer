const { Op } = require('sequelize');
const { Recipe, User } = require('../models');

const getAllRecipes = async (req, res) => {
  const { category, cuisine, difficulty, maxTime } = req.query;
  const where = { isPublic: true };

  if (category) where.category = category;
  if (cuisine) where.cuisine = cuisine;
  if (difficulty) where.difficulty = difficulty;
  if (maxTime) where.cookingTime = { [Op.lte]: parseInt(maxTime) };

  try {
    const recipes = await Recipe.findAll({ where, include: { model: User, as: 'author', attributes: ['username'] } });
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
