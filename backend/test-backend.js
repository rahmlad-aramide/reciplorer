const fetch = require('node-fetch');

const API_URL = 'http://localhost:8080/api';

async function testBackend() {
  console.log('Testing Backend...');

  try {
    // 1. Register
    const username = `testuser_${Date.now()}`;
    const email = `test_${Date.now()}@example.com`;
    const regRes = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password: 'password123' }),
    });
    const regData = await regRes.json();
    console.log('Register:', regRes.status === 201 ? 'PASS' : 'FAIL', regData);

    if (regRes.status !== 201) return;
    const token = regData.token;

    // 2. Create Recipe
    const recipeRes = await fetch(`${API_URL}/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: 'Test Pasta',
        cuisine: 'Italian',
        difficulty: 'Easy',
        cookingTime: 15,
        instructions: 'Boil water, cook pasta.'
      }),
    });
    const recipeData = await recipeRes.json();
    console.log('Create Recipe:', recipeRes.status === 201 ? 'PASS' : 'FAIL');

    // 3. AI Ask
    const aiRes = await fetch(`${API_URL}/ai/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: 'What is salt?' }),
    });
    const aiData = await aiRes.json();
    console.log('AI Ask:', aiData.response ? 'PASS' : 'FAIL');

  } catch (err) {
    console.error('Test Script Error:', err);
  }
}

testBackend();
