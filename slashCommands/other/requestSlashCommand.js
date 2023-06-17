const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { db } = require('../../models/db');

module.exports = class RequestSlashCommand extends SlashCommand {
  constructor() {
    super('request', {
      name: 'request',
      prefixId: 'request',
      category: 'other',
      commandType: 'command',
      description: 'Request something be added to the bot',
      slashOptions: [
        {
          name: 'type',
          description: 'The type of request',
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: [
            {
              name: 'song',
              value: 'song',
            },
            {
              name: 'gif',
              value: 'gif',
            },
            {
              name: 'wtf',
              value: 'wtf',
            },
            {
              name: 'other',
              value: 'other',
            },
          ],
        },
        {
          name: 'feature',
          description: 'The feature you\'d like to request',
          type: ApplicationCommandOptionType.String,
          required: true,
          min_length: 5,
          max_length: 200,
        },
      ],
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const type = interaction.options.getString('type', true);
    const feature = interaction.options.getString('feature', true);
    db.query('INSERT INTO requested (user, request) VALUES (?,?)', [interaction.user.username, `${type} - ${feature}`]);
    const embed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setDescription('Request Submitted!');
    return interaction.editReply({ embeds: [embed] });
  }

};
