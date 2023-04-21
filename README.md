# Hello, Discord!

This is an ongoing practice project for me to teach myself the workings of NodeJS with respect to coding a discord bot. Features are listed below. I've also elected to add some *(not-so) small* features to give the bot the personality of a furry femboy, because I think it's fun and I was bored. Based on the code found from [this](https://betterprogramming.pub/add-an-ai-to-your-discord-server-with-node-js-and-gpt-3-198b538cc05b) tutorial, but since adapted for discord.js V14.9.0. I'm continuously adding to it as I screw with different features. Figured I'd make it public so that people would be able to see what I'm working on :3

## Features

- Users can send prompts to an AI Chatbot (built around Davinci-003) with a built-in personality and receive answers, without leaving discord
- Full YouTube-based music bot capabilities
- The bot will detect the use of the words "furry" and "femboy" and respond in funny ways from a set list of responses

## Use

Music bot:

- /play search [keywords] | plays the top result for the entered keywords on YouTube
- /play url [url] | plays the YouTube video from the link specified
- /togglepause | pauses/plays the current song
- /queue | shows the current song and the next songs in the queue (shows up to 10 songs); includes duration and who requested
- /skip | skips the current song
- /removetrack [position] | removes the track located at the specified queue position (use /queue to find the position number)
- /exit | stops the player and disconnects it from the connected voice channel immediately

Chatbot:

- Just ping it ("@Zen's AI Bot") and type your message. With the default personality filter, the responses are gonna resemble replies to comments on a YouTube video, where your prompt becomes the "comment." It's pretty believable if you look at it like that. See below for a slight modification that turns it into a more funny, ostentatious Twitter furry.
- As of now, it lacks any memory of past prompts/"conversations." I don't really wanna change that, because it's too much data to track at once (there's no hard-stop for a conversation so it ends up trying to process the entire conversation history of the channel)

# ONLY READ PAST THIS IF YOU INTEND ON MODIFYING THE CODE

## Setup for Development (requires Node.js & NPM)

### Installing Dependencies

First you'll need to install the required libraries - do so by running the following command:

```{.sh}
npm install
```

### Environment Variable Creation

You'll need local environment variables for a few things.

- Run the following command or mantually create a new file at the root of the project called ".env:"

```{.sh}
cat > .env
```

- Using instructions outlined in the tutorial [here](https://betterprogramming.pub/add-an-ai-to-your-discord-server-with-node-js-and-gpt-3-198b538cc05b), generate an OpenAI API Secret Key and a Discord Bot Token, adding them to the .env file as follows:

```{.sh}
TOKEN='[INSERT_DISCORD_TOKEN_HERE]'
KEY='[INSERT_OPENAI_APIKEY_HERE]'
```

- You also need to add the Discord Bot's client ID, which can be found from the Discord Developer Portal where you got the secret key

```{.sh}
CLIENT_ID='[INSERT_ID_HERE]'
```

- Finally, create your own personality filter that will alter how the bot interacts with you. You can use mine as an example:

```{.sh}
PERSONALITY_FLTER='Respond to this message in a manner that would be expected of a member of the furry community online, containing both witty and flirtatious personality traits. Make your response as lengthy as you care to: '
```

## Activation and Use

Also in the tutorial above are instructions for creating the bot through discord's developer dashboard and inviting it to the server in which you want to test/deploy it. Go ahead and do both of those things.

To start the bot, run the following command:

```{.sh}
npm start
```

To exit, type CTRL+C (Windows) or CMD+C (Mac)