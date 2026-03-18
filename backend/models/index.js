const sequelize = require('../config/database');
const User = require('./User');
const Recipe = require('./Recipe');
const Review = require('./Review');
const Collection = require('./Collection');
const PantryItem = require('./PantryItem');
const ShoppingListItem = require('./ShoppingListItem');
const MealPlan = require('./MealPlan');

// User - Recipe (Author)
User.hasMany(Recipe, { as: 'AuthoredRecipes', foreignKey: 'authorId' });
Recipe.belongsTo(User, { as: 'author', foreignKey: 'authorId' });

// User - Review
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

// Recipe - Review
Recipe.hasMany(Review, { foreignKey: 'recipeId' });
Review.belongsTo(Recipe, { foreignKey: 'recipeId' });

// User - Collection
User.hasMany(Collection, { foreignKey: 'userId' });
Collection.belongsTo(User, { foreignKey: 'userId' });

// Recipe - Collection (Many-to-Many)
Recipe.belongsToMany(Collection, { through: 'RecipeCollections' });
Collection.belongsToMany(Recipe, { through: 'RecipeCollections' });

// User - PantryItem
User.hasMany(PantryItem, { foreignKey: 'userId' });
PantryItem.belongsTo(User, { foreignKey: 'userId' });

// User - ShoppingListItem
User.hasMany(ShoppingListItem, { foreignKey: 'userId' });
ShoppingListItem.belongsTo(User, { foreignKey: 'userId' });

// User - MealPlan
User.hasMany(MealPlan, { foreignKey: 'userId' });
MealPlan.belongsTo(User, { foreignKey: 'userId' });

// Recipe - MealPlan
Recipe.hasMany(MealPlan, { foreignKey: 'recipeId' });
MealPlan.belongsTo(Recipe, { foreignKey: 'recipeId' });

// User - Recipe (Favorites)
User.belongsToMany(Recipe, { through: 'UserFavorites', as: 'FavoriteRecipes' });
Recipe.belongsToMany(User, { through: 'UserFavorites', as: 'FavoritedBy' });

module.exports = {
  sequelize,
  User,
  Recipe,
  Review,
  Collection,
  PantryItem,
  ShoppingListItem,
  MealPlan,
};
