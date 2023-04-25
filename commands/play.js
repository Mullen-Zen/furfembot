const {SlashCommandBuilder, EmbedBuilder} = require("@discordjs/builders");
const { QueryType, useQueue } = require("discord-player");
let { queueExists } = require('../bot.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays a song.")
    .addSubcommand(subcommand => 
      subcommand
        .setName("search")
        .setDescription("Searches for a song.")
        .addStringOption(option => 
          option
            .setName("searchterms")
            .setDescription("search keywords")
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand => 
      subcommand
        .setName("url")
        .setDescription("Plays a video from YouTube")
        .addStringOption(option => 
          option
            .setName("url")
            .setDescription("url of the youtube video")
            .setRequired(true)
        )
    ),
  execute: async ({client, interaction}) => {
    if (!queueExists) {
      var queue = client.player.nodes.create(interaction.guild, {
        metadata: {
          channel: interaction.channel,
          client: interaction.guild.members.me,
          requestedBy: interaction.user,
        },
        selfDeaf: true,
        volume: 50,
        leaveOnEmpty: true,
        leaveOnEmptyCooldown: 300000,
        leaveOnEnd: true,
        leaveOnEndCooldown: 300000,
      });
      queueExists = true;
    } else {
      queue = useQueue(interaction.guild.id);
    }

    if (!interaction.member.voice.channel) {
      await interaction.reply("You must be in a voice channel to use this command.");
      return;
    }

    if (!queue.connection) await queue.connect(interaction.member.voice.channel);

    let embed = new EmbedBuilder();

    let url = interaction.options.getString((interaction.options.getSubcommand() === "search") ? "searchterms" : "url");

    const result = 
      (interaction.options.getSubcommand() === "search") ? 
        await client.player.search(url, {
          requestedBy: interaction.user,
          searchEngine: QueryType.YOUTUBE_SEARCH,
        }) :
        await client.player.search(url, {
          requestedBy: interaction.user,
          searchEngine: QueryType.YOUTUBE_VIDEO,
        });

    if (result.tracks.length === 0) {
      await interaction.reply("No results found");
      return;
    }

    const song = result.tracks[0];
    await queue.insertTrack(song, queue.tracks.size);

    try {
      embed
      .setDescription("Now queueing **" + song.title + " (" + song.url + ")**.")
      .setThumbnail(song.thumbnail)
      .setFooter({text: "Duration: " + song.duration});
      await interaction.reply({ embeds: [embed] });
    } catch (e) {
      console.log(e);
    }

    if(!queue.isPlaying()) await queue.node.play();
    console.log("Song played.");

  }
}