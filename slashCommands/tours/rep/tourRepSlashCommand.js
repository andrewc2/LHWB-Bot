const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = class TourRepSlashCommand extends SlashCommand {
  constructor() {
    super('tourRep', {
      commandType: 'group',
      name: 'tour reputation',
      description: 'View information about Taylor Swift\'s reputation tour',
      parentCommand: 'tour',
      shortName: 'reputation',
      slashOptions: [
        {
          name: 'setlist',
          description: 'Displays the setlist for Taylor Swift\'s reputation Stadium Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'guests',
          description: 'Displays the guest list on Taylor Swift\'s reputation Stadium Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'secret-songs',
          description: 'Displays the secret songs from Taylor Swift\'s reputation Stadium Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
    });
  }
};
