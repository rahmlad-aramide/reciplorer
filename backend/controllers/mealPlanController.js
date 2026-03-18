const { MealPlan, Recipe } = require('../models');

const getMealPlans = async (req, res) => {
  try {
    const plans = await MealPlan.findAll({
      where: { userId: req.userId },
      include: [Recipe]
    });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching meal plans', error: error.message });
  }
};

const addMealPlan = async (req, res) => {
  const { date, mealType, recipeId, notes } = req.body;
  try {
    const plan = await MealPlan.create({ date, mealType, recipeId, notes, userId: req.userId });
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Error adding meal plan', error: error.message });
  }
};

const deleteMealPlan = async (req, res) => {
  try {
    const plan = await MealPlan.findOne({ where: { id: req.params.id, userId: req.userId } });
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    await plan.destroy();
    res.json({ message: 'Plan deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting meal plan', error: error.message });
  }
};

module.exports = { getMealPlans, addMealPlan, deleteMealPlan };
