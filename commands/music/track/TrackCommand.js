import Command from '../../../structure/commands/Command.js';
import { ApplicationCommandOptionType } from 'discord.js';

export default class TrackCommand extends Command {
  constructor() {
    super('track', {
      name: 'track',
      description: 'View information related to tracks',
      guildOnly: true,
      options: [
        {
          name: 'list',
          description: 'View the available tracks to queue',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'information',
          description: 'View information about a track',
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
      deploymentDetails: {
        commandType: 'command',
        musicServer: true,
      },
    });
  }
}
