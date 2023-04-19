// Needs to be tested still!
const {SlashCommandBuilder} = require("@discordjs/builders");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("toggle pause")
    .setDescription("Pauses/plays the current song."),
  execute: async ({client, interaction}) => {

    const queue = useQueue(interaction.guild);

    if (!queue) {
      await interaction.reply("There is no song playing!");
      return;
    }

    queue.node.setPaused(!queue.node.isPaused());

    await interaction.reply("Pause toggled!");
  }
}