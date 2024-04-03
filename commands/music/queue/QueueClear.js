import Command from '../../../structure/commands/Command.js';
import Utilities from '../../../utilities/Utilities.js';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, ComponentType, EmbedBuilder } from 'discord.js';
import Permission from '../../../utilities/Permission.js';

export default class QueueClear extends Command {
  constructor() {
    super('queueClear', {
      name: 'queue clear',
      category: 'music',
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'queue',
        shortName: 'clear',
      },
    });
  }

  async userPermissions(interaction) {
    return await Permission.musicTrustedPermissionsCheck(this.client, interaction);
  }

  async exec(interaction) {
    await interaction.deferReply({ fetchReply: true });
    const server = Utilities.getVoiceServer(this.client, interaction.guildId);

    const queue = await server.getQueue();

    if (queue.length === 0) {
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription('The queue is already empty.')
            .setColor(Colors.Red),
        ],
      });
    }

    const embed = new EmbedBuilder()
      .setDescription(`${interaction.user}, Are you sure you want to clear the queue?`)
      .setColor(Colors.Green);

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('clear')
          .setLabel('Clear')
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId('cancel')
          .setLabel('Cancel')
          .setStyle(ButtonStyle.Secondary),
      );

    const message = await interaction.editReply({ embeds: [embed], components: [row] });

    const filter = async i => {
      await i.deferUpdate();
      return i.user.id === interaction.user.id;
    };

    message.awaitMessageComponent({ filter, componentType: ComponentType.Button, time: 10000 })
      .then(i => {
        if (i.customId === 'clear') {
          server.clearQueue();
          i.editReply({ embeds: [embed.setDescription('The queue has been cleared 🧹')], components: [] });
        }
        else {
          i.deleteReply();
        }
      })
      .catch(() => interaction.editReply({ components: [] }));
  }
}
