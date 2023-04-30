// In ai.js
require('dotenv').config();

const key = (process.env.KEY);
const personalityFilter = (process.env.PERSONALITY_FILTER);
const { Configuration, OpenAIApi } = require("openai");
const config = new Configuration({ 
  apiKey: key,
});
const openai = new OpenAIApi(config);

let GPT35Turbo = async (message) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {"role": "system", "content": personalityFilter},
      {"role": "user", "content": message}
    ],
    temperature: 0.7,
    max_tokens: 512,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.data.choices[0].message.content;
}

module.exports = {
  GPT35Turbo,
};