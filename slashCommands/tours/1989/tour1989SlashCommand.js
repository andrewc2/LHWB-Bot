const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = class Tour1989SlashCommand extends SlashCommand {
  constructor() {
    super('tour1989', {
      commandType: 'group',
      name: 'tour 1989',
      description: 'View information about Taylor Swift\'s 1989 tour',
      parentCommand: 'tour',
      shortName: '1989',
      slashOptions: [
        {
          name: 'setlist',
          description: 'Displays the setlist for Taylor Swift\'s 1989 World Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'guests',
          description: 'Displays the guest list on Taylor Swift\'s 1989 World Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'secret-songs',
          description: 'Displays the secret songs from Taylor Swift\'s 1989 World Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
    });
  }
};
