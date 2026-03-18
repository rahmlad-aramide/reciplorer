const express = require('express');
const router = express.Router();
const { getAllRecipes, getRecipeById, createRecipe } = require('../controllers/recipeController');
const authenticate = require('../middleware/auth');

router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);
router.post('/', authenticate, createRecipe);

module.exports = router;
