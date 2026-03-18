const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');
const aiRoutes = require('./routes/ai');
const pantryRoutes = require('./routes/pantry');
const shoppingListRoutes = require('./routes/shopping-list');
const mealPlanRoutes = require('./routes/meal-plans');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/pantry', pantryRoutes);
app.use('/api/shopping-list', shoppingListRoutes);
app.use('/api/meal-plans', mealPlanRoutes);

app.get('/', (req, res) => {
  res.send('Reciplorer API is running!');
});

// Start Server
sequelize.authenticate().then(() => {
  console.log('Database connected!');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Database connection error:', err);
});
