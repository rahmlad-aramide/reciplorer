const { askAI } = require('../services/aiService');

const ask = async (req, res) => {
  const { question, context } = req.body;

  if (!question) {
    return res.status(400).json({ message: 'Question is required' });
  }

  try {
    const response = await askAI(question, context);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ message: 'Error from AI service', error: error.message });
  }
};

module.exports = { ask };
