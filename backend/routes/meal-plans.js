const express = require('express');
const router = express.Router();
const { getMealPlans, addMealPlan, deleteMealPlan } = require('../controllers/mealPlanController');
const authenticate = require('../middleware/auth');

router.get('/', authenticate, getMealPlans);
router.post('/', authenticate, addMealPlan);
router.delete('/:id', authenticate, deleteMealPlan);

module.exports = router;
