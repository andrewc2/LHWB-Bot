const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder, ApplicationCommandOptionType, Colors } = require('discord.js');
const { isVoiceServer } = require('../../../utilities/permissions');
const { autocomplete } = require('../../../commandUtilities/queueUtilities');

module.exports = class TrackInfoSlashCommand extends SlashCommand {
  constructor() {
    super('trackInfo', {
      name: 'track information',
      prefixId: 'trackInfo',
      category: 'music',
      channel: 'guild',
      commandType: 'sub',
      parentCommand: 'track',
      shortName: 'information',
      slashOptions: [
        {
          name: 'track',
          description: 'The name of the track to view information for',
          type: ApplicationCommandOptionType.String,
          required: true,
          autocomplete: true,
        },
      ],
    });
  }

  userPermissions(message) {
    if (isVoiceServer(message.guild.id)) return 'Server';
  }

  async exec(interaction, message) {
    await interaction.deferReply();
    const track = interaction.options.getString('track', true);
    const trackType = this.client.messageCommandHandler.resolver.type('song');
    const findTrack = await trackType(message, track);

    const failEmbed = new EmbedBuilder().setColor(Colors.Red);

    if (!findTrack) {
      return await interaction.editReply({
        embeds: [failEmbed.setDescription('That song could not be found.\nPlease check the track listings (/tracks).\nIf it\'s not there ask iAndrewC to add the song.')],
      });
    }

    const embed = new EmbedBuilder()
      .setTitle('Track Information')
      .setThumbnail(findTrack.album_art_url.toString())
      .addFields([
        { name: 'Name', value: findTrack.official_name.toString(), inline: true },
        { name: 'Album', value: findTrack.album.toString(), inline: true },
        { name: 'Artist', value: findTrack.artist_name.toString(), inline: true },
        { name: 'Track Number', value: findTrack.track_number.toString(), inline: true },
        { name: 'Play Count', value: findTrack.play_count.toString(), inline: true },
      ])
      .setColor(Colors.Green);

    return interaction.editReply({ embeds: [embed] });
  }

  async autocomplete(interaction) {
    await autocomplete(interaction);
  }
};
