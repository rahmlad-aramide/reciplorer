const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ShoppingListItem = sequelize.define('ShoppingListItem', {
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
  isPurchased: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

module.exports = ShoppingListItem;
