const { Recipe, Review, User } = require('../models');

exports.addReview = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { rating, comment } = req.body;
    const review = await Review.create({
      rating,
      comment,
      RecipeId: recipeId,
      UserId: req.userId,
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecipeReviews = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const reviews = await Review.findAll({
      where: { RecipeId: recipeId },
      include: [{ model: User, attributes: ['username'] }],
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
