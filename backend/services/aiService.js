const fetch = require('node-fetch');
require('dotenv').config();

const HUGGING_FACE_TOKEN = process.env.HUGGING_FACE_TOKEN;
const MODEL_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

const askAI = async (question, context = "") => {
  if (!HUGGING_FACE_TOKEN || HUGGING_FACE_TOKEN === 'your-token-here') {
    // Return a mock response if no token is provided
    return `Mock AI response for: "${question}". (Set HUGGING_FACE_TOKEN in .env for real responses)`;
  }

  const prompt = `<s>[INST] You are a helpful AI cooking assistant for the Reciplorer app. Answer the user's question about cooking or recipes based on the provided context.
Context: ${context}
Question: ${question} [/INST]`;

  try {
    const response = await fetch(MODEL_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGING_FACE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt, parameters: { max_new_tokens: 500 } }),
    });

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }

    let generatedText = data[0]?.generated_text || "";
    // Remove the prompt from the response
    const answer = generatedText.split('[/INST]').pop().trim();
    return answer;
  } catch (error) {
    console.error("AI Service Error:", error);
    return `AI Assistant is currently unavailable. Error: ${error.message}`;
  }
};

module.exports = { askAI };
