const {SlashCommandBuilder} = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("exit")
    .setDescription("Exits the voice channel."),
  execute: async ({client, interaction}) => {

    const queue = client.player.nodes.create(interaction.guild);

    if (!queue) {
      await interaction.reply("There is no song playing.");
      return;
    }

    queue.delete();

    await interaction.reply("You've terminated my process UwU :3");
    console.log("Player exited.");
  }
}