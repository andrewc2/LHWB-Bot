import Command from '../../../structure/commands/Command.js';
import { ApplicationCommandOptionType, Colors, EmbedBuilder } from 'discord.js';
import { findTrack, autocomplete } from '../../../commandUtilities/queueUtilities.js';
import Utilities from '../../../utilities/Utilities.js';

export default class TrackInformation extends Command {
  constructor() {
    super('trackInformation', {
      name: 'track information',
      category: 'music',
      options: [
        {
          name: 'track',
          type: ApplicationCommandOptionType.String,
          description: 'The name of the track to view information for (defaults to the current song)',
          required: false,
          autocomplete: true,
        },
      ],
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'track',
        shortName: 'information',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const server = Utilities.getVoiceServer(this.client, interaction.guildId);
    const name = interaction.options.getString('track') ?? (await server.getRecent(1))[0]['official_name'];
    const track = await findTrack(name);

    if (!track) {
      return await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Red)
            .setDescription(`That song could not be found.\nPlease check the track listings (${Utilities.getCommandMention(this.client, 'track list')}).\nIf it's not there, use the ${Utilities.getCommandMention(this.client, 'request')} command to request it.`),
        ],
      });
    }

    const embed = new EmbedBuilder()
        .setTitle(`${track.official_name} - ${track.artist_name}`)
        .setThumbnail(track.album_art_url.toString())
        .addFields([
          { name: 'Album', value: track.album.toString(), inline: true },
          { name: 'Track Number', value: track.track_number.toString(), inline: true },
          { name: 'Play Count', value: track.play_count.toString(), inline: true },
        ])
        .setColor('#FF69B4')

    return interaction.editReply({ embeds: [embed] });
  }

  async autocomplete(interaction) {
    await autocomplete(interaction);
  }
}
