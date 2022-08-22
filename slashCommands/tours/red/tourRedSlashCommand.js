const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = class TourRedSlashCommand extends SlashCommand {
  constructor() {
    super('tourRed', {
      commandType: 'group',
      name: 'tour red',
      description: 'View information about Taylor Swift\'s Red tour',
      parentCommand: 'tour',
      shortName: 'red',
      slashOptions: [
        {
          name: 'setlist',
          description: 'Displays the setlist for Taylor Swift\'s Red Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'guests',
          description: 'Displays the guest list on Taylor Swift\'s Red Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
    });
  }
};
