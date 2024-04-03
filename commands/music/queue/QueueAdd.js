import Command from '../../../structure/commands/Command.js';
import { ApplicationCommandOptionType, Colors, EmbedBuilder } from 'discord.js';
import { autocomplete, findTrack } from '../../../commandUtilities/queueUtilities.js';
import Utilities from '../../../utilities/Utilities.js';
import Permission from '../../../utilities/Permission.js';

export default class QueueAdd extends Command {
  constructor() {
    super('queueAdd', {
      name: 'queue add',
      category: 'music',
      options: [
        {
          name: 'track',
          description: 'The name of the track to queue',
          type: ApplicationCommandOptionType.String,
          required: true,
          autocomplete: true,
        },
      ],
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'queue',
        shortName: 'add',
      },
    });
  }

  async userPermissions(interaction) {
    return await Permission.musicPermissionsCheck(this.client, interaction);
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

    const server = Utilities.getVoiceServer(this.client, interaction.guildId);
    const result = await server.addToQueue(track['path'], track['official_name'], track['artist_name'], track['id'], interaction.user.username);

    const embed = new EmbedBuilder().setColor(result.success ? '#FF69B4' : Colors.Red).setDescription(result.reason);
    return interaction.editReply({ embeds: [embed] });
  }

  async autocomplete(interaction) {
    await autocomplete(interaction);
  }
}
