// In ai.js
require('dotenv').config();

const key = (process.env.KEY);
const personalityFilter = (process.env.PERSONALITY_FILTER);
const { Configuration, OpenAIApi } = require("openai");
const config = new Configuration({ 
  apiKey: key,
});
const openai = new OpenAIApi(config);
async function ask(prompt) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0.7,
    max_tokens: 512,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  const answer = response.data.choices[0].text;
  return(answer);
}
const topic = "JavaScript";
const question = "How to send an openai api request";
const GPT35TurboMessage = [
  { role: "system", content: `You are a ${topic} developer.` },
  {
    role: "user",
    content: "Which npm package is best of openai api development?",
  },
  {
    role: "assistant",
    content: "The 'openai' Node.js library.",
  },
  { role: "user", content: question },
];

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

// console.log("### I'm GPT-3.5-TURBO. ####" + await GPT35Turbo(GPT35TurboMessage));

// Export the "ask" function
module.exports = {
  //GPT3.5TURBO
  GPT35Turbo,
  ask,
};