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
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.MessageContent,
  ]
});
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const affirmatives = [
  "ong",
  "fr",
  "no cap",
  "bussin",
]

client.on('ready', () => {
  console.log("The AI bot is online"); // Message when bot is online
});

// AI Prompting
client.on('messageCreate', async (message) => {
  if (message.content.substring(0, 1) === '!') {
    console.log("Bot-directed message detected:\n" + message.author.toString() + " prompted " + String(message.content.substring(1)) + ".\nResponding now...");
    const prompt = message.content.substring(1); // Remove the exclamation mark from the message
    const answer = await ask(prompt); // Prompt the robot
    message.channel.send(answer); // Reply to the message with the generated response
    console.log("Response sent!");
  }
});

// Furry Femboy Programming
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
        break;
        default:
    }
    console.log("Response sent!");
  } else if ((message.content.toLowerCase().includes('femboy') || message.content.toLowerCase().includes('bussy')) && (message.author.id !== client.user.id)) {
    console.log("Femboy message detected. Responding with something sus now...")
    const responseCode = getRandomInt(0, 6);
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
        break;
      case(4):
        message.channel.send(message.author.toString() + " wasn't lying tho that bussy can SQUIRT");
        break;
      case(5):
        message.channel.send("I'm a certified bussy enjoyer and " + message.author.toString() + " can confirm it")
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
        break;
      case(4):
        console.log("Imma make this one really cringe :3");
        message.channel.send(copypasta);
        break;
      default:
    }
    console.log("Response sent");
  }
})

// fr fr ong bro
client.on('messageCreate', (message) => {
  for (let i = 0; i < affirmatives.length; i++) {
    if ((message.content.toLowerCase().includes(affirmatives[i])) && (message.author.id !== client.user.id)) {
      const responseCode = getRandomInt(0, 4);
      switch(responseCode) {
        case(0):
          message.channel.send("no cap fr man");
          break;
        case(1):
          message.channel.send("you right tho");
          break;
        case(2):
          message.channel.send("fr fr");
          break;
        case(3):
          message.channel.send("ong bro");
          break;
        default:
      }
    }
  }
})

// Now it knows when someone's typing
client.on('typingStart', (typing) => {
  console.log("Someone is typing");
});

client.login(token);