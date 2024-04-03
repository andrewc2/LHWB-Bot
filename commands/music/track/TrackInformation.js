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
          description: 'The name of the track to view information for',
          required: true,
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
    const name = interaction.options.getString('track', true);
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
      .setTitle('Track Information')
      .setThumbnail(track.album_art_url.toString())
      .addFields([
        { name: 'Name', value: track.official_name.toString(), inline: true },
        { name: 'Album', value: track.album.toString(), inline: true },
        { name: 'Artist', value: track.artist_name.toString(), inline: true },
        { name: 'Track Number', value: track.track_number.toString(), inline: true },
        { name: 'Play Count', value: track.play_count.toString(), inline: true },
      ])
      .setColor(Colors.Green);

    return interaction.editReply({ embeds: [embed] });
  }

  async autocomplete(interaction) {
    await autocomplete(interaction);
  }
}
