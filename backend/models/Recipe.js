const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Recipe = sequelize.define('Recipe', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  instructions: {
    type: DataTypes.TEXT,
  },
  cuisine: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  difficulty: {
    type: DataTypes.ENUM('Easy', 'Medium', 'Hard'),
  },
  cookingTime: {
    type: DataTypes.INTEGER, // in minutes
  },
  calories: {
    type: DataTypes.INTEGER,
  },
  protein: {
    type: DataTypes.FLOAT,
  },
  carbs: {
    type: DataTypes.FLOAT,
  },
  fats: {
    type: DataTypes.FLOAT,
  },
  image: {
    type: DataTypes.STRING,
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
});

module.exports = Recipe;
