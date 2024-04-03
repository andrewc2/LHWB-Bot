import Command from '../../structure/commands/Command.js';
import { Colors, EmbedBuilder, PermissionsBitField } from 'discord.js';
import Utilities from '../../utilities/Utilities.js';

export default class Stage extends Command {
  constructor() {
    super('stage', {
      name: 'stage',
      description: 'Join the servers stage channel',
      userPermissions: [PermissionsBitField.Flags.ModerateMembers],
      category: 'utilities',
      guildOnly: true,
      deploymentDetails: {
        commandType: 'command',
        musicServer: true,
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const server = Utilities.getVoiceServer(this.client, interaction.guildId);

    const stageChannel = server.getStageChannel();

    if (server.isInStageChannel()) {
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription('The bot is already in a stage channel.')
            .setColor(Colors.Red),
        ],
      });
    }

    const stageManager = [
      PermissionsBitField.Flags.ManageChannels,
      PermissionsBitField.Flags.MuteMembers,
      PermissionsBitField.Flags.MoveMembers,
    ];

    if (!stageChannel.permissionsFor(interaction.guild.members.me).has(stageManager)) {
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`I need to be a Stage Manager on ${stageChannel.name} in order to switch to this stage channel.`)
            .setColor(Colors.Red),
        ],
      });
    }

    await server.switchToStageChannel();
    return interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setDescription('Switched to the stage channel.')
          .setColor('#9979FF'),
      ],
    });
  }
}
