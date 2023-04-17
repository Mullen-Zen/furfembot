// In bot.js
require('dotenv').config();

const { ask } = require("./ai.js"); // Import "ask" function from the ai.js file
const token = (process.env.TOKEN);
const copypasta = (process.env.COPYPASTA);
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

client.on('ready', () => {
  console.log("The AI bot is online"); // Message when bot is online
});

client.on('messageCreate', async (message) => {
  if (message.content.substring(0, 1) === '!') {
    console.log("Bot-directed message detected:\n" + message.author.toString() + " prompted " + String(message.content.substring(1)) + ".\nResponding now...");
    const prompt = message.content.substring(1); // Remove the exclamation mark from the message
    const answer = await ask(prompt); // Prompt the robot
    message.channel.send(answer); // Reply to the message with the generated response
    console.log("Response sent!");
  }
});

client.on('messageCreate', (message) => {
  if ((message.content.toLowerCase().includes('men') || message.content.toLowerCase().includes('man')) && (message.author.id !== client.user.id)) {
    console.log("Men message detected. Responding with something sus now...");
    const responseCode = getRandomInt(0, 2);
    switch(responseCode) {
      case(0):
        message.channel.send("men?? where are the men??");
        break;
      case(1):
        message.channel.send(message.author.toString() + " Why are you talking about men so much?? You tryina get fucked or sumn?? Damn");
      default:
    }
    console.log("Response sent!");
  } else if ((message.content.toLowerCase().includes('femboy')) && (message.author.id !== client.user.id)) {
    console.log("Femboy message detected. Responding with something sus now...")
    const responseCode = getRandomInt(0, 4);
    switch(responseCode) {
      case(0):
        message.channel.send(message.author.toString() + " is a total bottom, btw");
        break;
      case(1):
        message.channel.send(message.author.toString() + " desperately wants to get topped but doesn't know how to tell you guys, so he asked me to.");
        break;
      case(2):
        message.channel.send("don't even get me STARTED on femboys imma get all horny n shit godDAMN");
        break;
      case(3):
        message.channel.send("??");
      default:
    }
    console.log("Response sent!");
  } else if ((message.content.toLowerCase().includes('furry')) && (message.author.id !== client.user.id)) {
    console.log("Furry message detected. Responding with something sus now...");
    const responseCode = getRandomInt(0, 5);
    switch(responseCode) {
      case(0):
        message.channel.send(message.author.toString() + " is like actually a furry, btw");
        break;
      case(1):
        message.channel.send(message.author.toString() + " desperately wants to get yiffed and knotted asap");
        break;
      case(2):
        message.channel.send("grrr don't even get me STARTED on furries imma get all horny n shit godDAMN");
        break;
      case(3):
        message.channel.send("??");
      case(4):
      console.log("Imma make this one really cringe :3");
        message.channel.send(copypasta);
      default:
    }
    console.log("Response sent");
  }
})

client.login(token);