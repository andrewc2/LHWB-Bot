import { Command } from '@lhwb/framework';
import { EmbedFormatter } from '@lhwb/shared';
import { ChatInputCommandInteraction, PermissionsBitField } from 'discord.js';

import Utilities from '../../modules/tool/Utilities.js';

export default class Stage extends Command {
  constructor() {
    super('stage', {
      name: 'stage',
      description: 'Join the servers stage channel',
      guildOnly: true,
      category: 'music',
      userPermissions: [PermissionsBitField.Flags.ModerateMembers],
    });
  }

  async exec(interaction: ChatInputCommandInteraction) {
    const server = Utilities.getMusicServer(this.client, interaction.guildId!);

    if (!server) {
      return interaction.editReply({
        embeds: [EmbedFormatter.notMusicServer()],
      });
    }

    const stageChannel = server.getStageChannel();

    if (!stageChannel) {
      return interaction.editReply({
        embeds: [
          EmbedFormatter.standardErrorEmbed().setDescription(
            'Sorry, I could not find the stage channel in this server.',
          ),
        ],
      });
    }

    if (server.isInStageChannel()) {
      return interaction.editReply({
        embeds: [
          EmbedFormatter.standardErrorEmbed().setDescription(
            'The bot is already in a stage channel.',
          ),
        ],
      });
    }

    const stageManager = [
      PermissionsBitField.Flags.ManageChannels,
      PermissionsBitField.Flags.MuteMembers,
      PermissionsBitField.Flags.MoveMembers,
    ];

    if (
      !stageChannel
        .permissionsFor(interaction.guild!.members.me!)
        .has(stageManager)
    ) {
      return interaction.editReply({
        embeds: [
          EmbedFormatter.standardErrorEmbed().setDescription(
            `I need to be a Stage Manager on ${stageChannel.name} in order to switch to this stage channel.`,
          ),
        ],
      });
    }

    await server.switchToStageChannel();

    return interaction.editReply({
      embeds: [
        EmbedFormatter.standardSuccessEmbed().setDescription(
          'Switched to the stage channel.',
        ),
      ],
    });
  }
}
