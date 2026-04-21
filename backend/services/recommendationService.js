const { Recipe, Review } = require('../models');
const { Op } = require('sequelize');

class RecommendationService {
  async getRecommendedRecipes(userId) {
    try {
      // 1. Get user's liked recipes or highly rated ones
      const userReviews = await Review.findAll({
        where: { UserId: userId, rating: { [Op.gte]: 4 } },
        include: [Recipe]
      });

      const likedCuisines = userReviews.map(r => r.Recipe.cuisine).filter(Boolean);
      const likedCategories = userReviews.map(r => r.Recipe.category).filter(Boolean);

      // 2. Find similar recipes
      const recommendations = await Recipe.findAll({
        where: {
          [Op.or]: [
            { cuisine: { [Op.in]: likedCuisines } },
            { category: { [Op.in]: likedCategories } }
          ],
          id: { [Op.notIn]: userReviews.map(r => r.RecipeId) } // Don't recommend what they already liked
        },
        limit: 10,
        order: [['createdAt', 'DESC']]
      });

      // 3. Fallback: If no specific recommendations, return trending/new recipes
      if (recommendations.length === 0) {
        return await Recipe.findAll({
          limit: 10,
          order: [['createdAt', 'DESC']]
        });
      }

      return recommendations;
    } catch (error) {
      console.error('Error in RecommendationService:', error);
      throw error;
    }
  }
}

module.exports = new RecommendationService();
