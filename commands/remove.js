const {SlashCommandBuilder} = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removetrack")
    .setDescription("Removes a track at the specified location.")
    .addStringOption(option => 
      option
        .setName("position")
        .setDescription("Position in the queue of the song to remove.")
        .setRequired(true)
    ),
  execute: async ({client, interaction}) => {

    const queue = useQueue(interaction.guild.id);

    if (!queue) {
      await interaction.reply("There is no song playing!");
      return;
    }

    const position = interaction.options.getString("position") - 1;
    const removedTrack = queue.tracks.data[position];
    queue.removeTrack(position);

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription("Removed **" + removedTrack.title + "** from the queue.")
          .setThumbnail(removedTrack.thumbnail)
      ]
    })
  }
}