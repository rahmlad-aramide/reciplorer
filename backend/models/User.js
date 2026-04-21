const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
  },
  profilePicture: {
    type: DataTypes.STRING,
  },
  dietaryRestrictions: {
    type: DataTypes.STRING, // Store as JSON string if needed, or simple comma separated
  },
  preferences: {
    type: DataTypes.STRING, // e.g., "vegan,gluten-free"
  },
  cookingStreak: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  lastCookedAt: {
    type: DataTypes.DATE,
  },
  badges: {
    type: DataTypes.TEXT, // Store as JSON array string
  },
}, {
  timestamps: true,
});

module.exports = User;
