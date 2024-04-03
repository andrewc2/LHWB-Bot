import Command from '../../../structure/commands/Command.js';
import { ApplicationCommandOptionType } from 'discord.js';

export default class Recent extends Command {
  constructor() {
    super('recent', {
      commandType: 'command',
      name: 'recent',
      description: 'Control the music queue in a server',
      guildOnly: true,
      options: [
        {
          name: 'server',
          description: 'Shows the 10 most recently played songs on the server',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'user',
          description: 'Shows the 10 most recently listened to songs by user',
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
