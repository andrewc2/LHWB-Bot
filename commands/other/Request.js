import Command from '../../structure/commands/Command.js';
import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import { database } from '../../models/database.js';

export default class Request extends Command {
  constructor() {
    super('request', {
      name: 'request',
      category: 'other',
      description: 'Request something be added to the bot',
      options: [
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
      deploymentDetails: {
        commandType: 'command',
        integrationTypes: [0, 1],
        contexts: [0, 1, 2],
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const type = interaction.options.getString('type', true);
    const feature = interaction.options.getString('feature', true);
    database.query('INSERT INTO requested (user, request) VALUES (?,?)', [interaction.user.username, `${type} - ${feature}`]);
    const embed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setDescription('Request Submitted!');
    return interaction.editReply({ embeds: [embed] });
  }

}
