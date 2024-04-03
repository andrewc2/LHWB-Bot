import Command from '../../../structure/commands/Command.js';
import { ApplicationCommandOptionType, PermissionsBitField } from 'discord.js';

export default class Trusted extends Command {
  constructor() {
    super('trusted', {
      name: 'trusted',
      category: 'permissions',
      description: 'Set, clear, and view the trusted role',
      userPermissions: [PermissionsBitField.Flags.ModerateMembers],
      guildOnly: true,
      options: [
        {
          name: 'set',
          description: 'Set the trusted role',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'clear',
          description: 'Clear the trusted role',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'view',
          description: 'View the trusted role',
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
      deploymentDetails: {
        commandType: 'command',
      },
    });
  }
}
