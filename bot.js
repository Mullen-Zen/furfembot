// In bot.js
require('dotenv').config();

const { ask } = require("./ai.js"); // Import "ask" function from the ai.js file
const token = (process.env.TOKEN);
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

client.on("ready", () => {
  console.log("The AI bot is online"); // Message when bot is online
});

client.on('messageCreate', async (message) => {
  if (message.content.substring(0, 1) === '!') {
    console.log("Bot-directed message detected: " + String(message.content.substring(1)) + "\nResponding now...");
    const prompt = message.content.substring(1); // Remove the exclamation mark from the message
    const answer = await ask(prompt); // Prompt the robot
    message.channel.send(answer); // Reply to the message with the generated response
    console.log("Response sent!");
  }
});

client.login(token);