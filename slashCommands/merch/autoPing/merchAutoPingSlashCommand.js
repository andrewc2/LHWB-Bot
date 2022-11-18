const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = class MerchAutoPingSlashCommand extends SlashCommand {
  constructor() {
    super('merchAutoPing', {
      name: 'merch auto-ping',
      prefixId: 'merch',
      parentCommand: 'merch',
      shortName: 'auto-ping',
      category: 'merch',
      channel: 'guild',
      commandType: 'group',
      slashLimitDeploy: true,
      description: 'Control pinging for merch auto-posting',
      slashOptions: [
        {
          name: 'join',
          description: 'Get pings for new merchandise on Taylor\'s store',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'leave',
          description: 'Stop receiving pings for new merchandise on Taylor\'s store',
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
    });
  }
};
