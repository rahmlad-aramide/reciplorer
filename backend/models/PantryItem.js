const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PantryItem = sequelize.define('PantryItem', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.STRING,
  },
  expiryDate: {
    type: DataTypes.DATEONLY,
  },
}, {
  timestamps: true,
});

module.exports = PantryItem;
