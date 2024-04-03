import Command from '../../../structure/commands/Command.js';
import { ApplicationCommandOptionType } from 'discord.js';

export default class TourEras extends Command {
  constructor() {
    super('tourEras', {
      name: 'tour eras',
      description: 'View information about Taylor Swift\'s The Eras tour',
      options: [
        {
          name: 'setlist',
          description: 'Displays the setlist for Taylor Swift The Eras Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'surprise-songs',
          description: 'Displays the surprise songs from Taylor Swift The Eras Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'secret-songs',
          description: 'Displays the secret songs from Taylor Swift The Eras Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'countdown',
          description: 'Displays the upcoming shows for Taylor Swift\'s The Eras Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
      deploymentDetails: {
        commandType: 'group',
        parentCommand: 'tour',
        shortName: 'eras',
      },
    });
  }
}
