const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = class TrackSlashCommand extends SlashCommand {
  constructor() {
    super('track', {
      commandType: 'command',
      name: 'track',
      description: 'View information related to tracks',
      slashOptions: [
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
        {
          name: 'play-count',
          description: 'See how many times a track has been played',
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
    });
  }
};
