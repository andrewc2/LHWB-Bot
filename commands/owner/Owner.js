import Command from '../../structure/commands/Command.js';
import { ApplicationCommandOptionType } from 'discord.js';

export default class Owner extends Command {
  constructor() {
    super('owner', {
      name: 'owner',
      description: 'Owner only bot commands',
      options: [
        {
          name: 'ban',
          description: 'Ban an entity from the bot',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'unban',
          description: 'Unban an entity from the bot',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'avatar',
          description: 'Change the bots avatar',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'say',
          description: 'Speak as the bot',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'nickname',
          description: 'Change the bots nickname',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'restart',
          description: 'Restarts the bot',
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
      deploymentDetails: {
        commandType: 'command',
      },
    });
  }
}
