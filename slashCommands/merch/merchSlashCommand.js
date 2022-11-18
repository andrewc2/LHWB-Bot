const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = class MerchSlashCommand extends SlashCommand {
  constructor() {
    super('merch', {
      name: 'merch',
      prefixId: 'merch',
      category: 'merch',
      channel: 'guild',
      commandType: 'command',
      slashLimitDeploy: true,
      description: 'Control merch auto-posting',
      slashOptions: [
        {
          name: 'auto-ping',
          description: 'Control pinging for merch auto-posting',
          type: ApplicationCommandOptionType.SubcommandGroup,
        },
      ],
    });
  }
};
