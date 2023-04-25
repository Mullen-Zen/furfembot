// In bot.js
require('dotenv').config();

const { ask } = require("./ai.js");
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { Player } = require("discord-player");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10")

const affirmatives = [
  " ong",
  "ong ",
  " fr",
  "fr ",
  "no cap",
  "bussin",
]
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ]
});
const commands = [];
const fs = require("node:fs");
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const path = require("node:path");
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
const personalityFilter = (process.env.PERSONALITY_FILTER);
const token = (process.env.TOKEN);

let queueExists = false;
exports.queueExists = queueExists;

// Linking commands for the music bot to the main bot client
client.commands = new Collection();
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
}

// Initializing music player
client.player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25
  }
})

// Bot initialization/"going online"
client.on('ready', () => {
  console.log("The AI bot is online");
  const guild_ids = client.guilds.cache.map(guild => guild.id);

  const rest = new REST({version: "10"}).setToken(process.env.TOKEN);
  for (const guildId of guild_ids) {
    rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), {
      body: commands
    })
    .then(() => console.log("Added commands to guild (ID: " + guildId + ")."))
    .catch(console.error);
  }
});

// Music player command handling
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute({client, interaction});
  } catch (e) {
    console.error(e);
    await interaction.reply("An error occured while executing that command.");
  }
});

// AI Prompting
client.on('messageCreate', async (message) => {
  if (message.author.id !== client.user.id) {
    let mention = (message.mentions.users.size > 0) ? message.mentions.users.first().bot === true : false;
    if (mention) {
      console.log("yay");
      console.log("Bot-directed message detected:\n" + message.author.toString() + " prompted " + String(message.content.substring(23)) + ".\nResponding now...");
      const prompt = message.content.substring(23); // Remove the ping from the message
      const answer = await ask(personalityFilter + prompt); // Prompt the robot, pass through personality filter
      console.log(answer);
      message.channel.send(answer); // Reply to the message with the generated response
      console.log("Response sent!");
    }
  }
});

// Furry Femboy Programming
client.on('messageCreate', (message) => {
  if ((message.content.toLowerCase().includes('femboy') || message.content.toLowerCase().includes('bussy')) && (message.author.id !== client.user.id)) {
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
        message.channel.send("I'm a certified bussy enjoyer and " + message.author.toString() + " can confirm it");
        break;
      default:
    }
    console.log("Response sent!");
  } else if ((message.content.toLowerCase().includes('furry')) && (message.author.id !== client.user.id)) {
    console.log("Furry message detected. Responding with something sus now...");
    const responseCode = getRandomInt(0, 4);
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
      default:
    }
    console.log("Response sent");
  }
})

// Gen Z affirmatives reaffirmation protocol
client.on('messageCreate', (message) => {
  if (message.author.id !== client.user.id) {
    for (let i = 0; i < affirmatives.length; i++) {
      if (message.content.toLowerCase().includes(affirmatives[i])) {
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
  }
})

// Now it knows when someone's typing
client.on('typingStart', (typing) => {
  console.log("Someone is typing...");
});

// Let the fun begin!
client.login(token);