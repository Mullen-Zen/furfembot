const {SlashCommandBuilder} = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Shows the first 10 songs in the queue."),
  execute: async ({client, interaction}) => {
    const queue = useQueue(interaction.guild);

    if (!queue || !queue.isPlaying) {
      await interaction.reply("There is nothing playing");
      return;
    }

    const queueString = queue.tracks.toArray().map((song, i) => {
      return (i + 1) + ") \`" + song.duration + "\` " + song.title + " - <@" + song.requestedBy.id + ">";
    }).join("\n");
  
    const currentSong = queue.currentTrack;

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription("**Currently Playing:**\n \`" + currentSong.duration + "\` " + currentSong.title + "- <@" + currentSong.requestedBy.id + ">\n\n**Queue:**\n" + queueString)
          .setThumbnail(currentSong.thumbnail)
      ]
     });
  }
}