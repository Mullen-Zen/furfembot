# Hello, Discord!

This is an ongoing practice project for me to teach myself the workings of NodeJS with respect to coding a discord bot. Features are listed below. I've also elected to add some *small* features to give the bot the personality of a furry femboy, because I think it's fun and I was bored. Based on the code found from [this](https://betterprogramming.pub/add-an-ai-to-your-discord-server-with-node-js-and-gpt-3-198b538cc05b) tutorial, but since adapted for discord.js V14.9.0. I'm continuously adding to it as I screw with different features. Figured I'd make it public so that people would be able to see what I'm working on :3

## Features

- Users can send prompts to a Davinci-003 AI Chatbot and receive answers, without leaving discord
- The bot will detect the use of the words "men," "man," "furry," and "femboy" and respond in funny ways from a set list of responses

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

- Also add a line as follows, but with a really funny copypasta that you want to chance triggering if a user in the server uses the word "furry"

```{.sh}
COPYPASTA='[INSERT_COPYPASTA_HERE]'
```

## Activation and Use

Also in the tutorial above are instructions for creating the bot through discord's developer dashboard and inviting it to the server in which you want to test/deploy it. Go ahead and do both of those things.

To start the bot, run the following command:

```{.sh}
npm start
```

To exit, type CTRL+C (Windows) or CMD+C (Mac)
