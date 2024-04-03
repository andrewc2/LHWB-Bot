import Command from '../../../structure/commands/Command.js';
import { ApplicationCommandOptionType, Colors, EmbedBuilder } from 'discord.js';
import { findTrack } from '../../../commandUtilities/queueUtilities.js';
import Utilities from '../../../utilities/Utilities.js';
import { autocomplete } from '../../../commandUtilities/queueUtilities.js';
import Permission from '../../../utilities/Permission.js';

export default class QueueRemove extends Command {
  constructor() {
    super('queueRemove', {
      name: 'queue remove',
      category: 'music',
      options: [
        {
          name: 'track',
          description: 'The name of the track to remove from the queue',
          type: ApplicationCommandOptionType.String,
          required: true,
          autocomplete: true,
        },
      ],
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'queue',
        shortName: 'remove',
      },
    });
  }

  async userPermissions(interaction) {
    return await Permission.musicTrustedPermissionsCheck(this.client, interaction);
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
    const isQueued = await server.isSongQueued(track['id']);

    if (!isQueued) {
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription('This song isn\'t in the queue at the moment.')
            .setColor(Colors.Red),
        ],
      });
    }

    server.dequeue(track['id']);
    return interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`${track['official_name']} has been removed from the queue.`)
          .setColor(Colors.Green),
      ],
    });
  }

  async autocomplete(interaction) {
    await autocomplete(interaction);
  }
}
