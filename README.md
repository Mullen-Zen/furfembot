# Hello, Discord!

This is an ongoing practice project for me to teach myself the workings of NodeJS with respect to coding a discord bot. Right now, the features are limited solely to GPT-3 text prompt responses. Based on the code found from [this](https://betterprogramming.pub/add-an-ai-to-your-discord-server-with-node-js-and-gpt-3-198b538cc05b) tutorial, but since adapted for discord.js V14.9.0. I'm continuously adding to it as I screw with different features. Figured I'd make it public so that people would be able to see what I'm working on :3

## Setup for Development (requires Node.js/NPM)

### Installing Dependencies

First you'll need to install the required libraries - do so by running the following command:

```{.sh}
npm install
```

### Environment Variable Creation

You'll need local environment variables for both a Discord Bot Token and an OpenAI API Secret Key.

- Run the following command or mantually create a new file at the root of the project called ".env:"

```{.sh}
cat > .env
```

- Using instructions outlined in the tutorial [here](https://betterprogramming.pub/add-an-ai-to-your-discord-server-with-node-js-and-gpt-3-198b538cc05b), generate an OpenAI API Secret Key and a Discord Bot Token, adding them to the .env file as follows:

```{.sh}
TOKEN='[INSERT_DISCORD_TOKEN_HERE]'
KEY='[INSERT_OPENAI_APIKEY_HERE]'
```

## Activation and Use

Also in the tutorial above are instructions for creating the bot through discord's developer dashboard and inviting it to the server in which you want to test/deploy it. Go ahead and do both of those things.

To start the bot, run the following command:

```{.sh}
npm start
```

To exit, type CTRL+C (Windows) or CMD+C (Mac)
