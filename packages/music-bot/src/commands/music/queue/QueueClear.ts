import { Command } from '@lhwb/framework';
import { EmbedFormatter } from '@lhwb/shared';
import {
  ChatInputCommandInteraction,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ButtonInteraction,
  ComponentType,
} from 'discord.js';

import Permission from '../../../modules/tool/Permission.js';
import Utilities from '../../../modules/tool/Utilities.js';

export default class QueueClear extends Command {
  constructor() {
    super('queueClear', {
      name: 'queue clear',
      description: 'Clear the queue',
      category: 'music',
      userPermissions: async (interaction: ChatInputCommandInteraction) => {
        return await Permission.musicTrustedPermissionsCheck(
          this.client,
          interaction,
        );
      },
    });
  }

  async exec(interaction: ChatInputCommandInteraction) {
    const server = Utilities.getMusicServer(this.client, interaction.guildId!);

    if (!server) {
      return interaction.editReply({
        embeds: [EmbedFormatter.notMusicServer()],
      });
    }

    const queue = await server.getQueue();

    if (queue.length === 0) {
      return interaction.editReply({
        embeds: [
          EmbedFormatter.standardErrorEmbed().setDescription(
            'The queue is already empty.',
          ),
        ],
      });
    }

    const message = await interaction.editReply({
      embeds: [
        EmbedFormatter.standardSuccessEmbed().setDescription(
          `${interaction.user}, Are you sure you want to clear the queue?`,
        ),
      ],
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          new ButtonBuilder()
            .setCustomId('clear')
            .setLabel('Clear')
            .setStyle(ButtonStyle.Danger),
          new ButtonBuilder()
            .setCustomId('cancel')
            .setLabel('Cancel')
            .setStyle(ButtonStyle.Secondary),
        ),
      ],
    });

    const filter = async (i: ButtonInteraction) => {
      await i.deferUpdate();
      return i.user.id === interaction.user.id;
    };

    message
      .awaitMessageComponent({
        filter,
        componentType: ComponentType.Button,
        time: 10000,
      })
      .then((i) => {
        if (i.customId === 'clear') {
          server.clearQueue();
          i.editReply({
            embeds: [
              EmbedFormatter.standardSuccessEmbed().setDescription(
                'The queue has been cleared.',
              ),
            ],
            components: [],
          });
        } else {
          i.deleteReply();
        }
      })
      .catch(() => interaction.editReply({ components: [] }));
  }
}
