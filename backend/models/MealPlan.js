const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MealPlan = sequelize.define('MealPlan', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  mealType: {
    type: DataTypes.STRING, // breakfast, lunch, dinner
  },
  notes: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: true,
});

module.exports = MealPlan;
