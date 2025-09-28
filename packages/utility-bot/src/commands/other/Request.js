import { Command } from '@lhwb/framework';
import { EmbedFormatter } from '@lhwb/shared';
import { ApplicationCommandOptionType } from 'discord.js';

export default class Request extends Command {
  constructor() {
    super('request', {
      name: 'request',
      description: 'Request something be added to the bot',
      category: 'other',
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
          description: "The feature you'd like to request",
          type: ApplicationCommandOptionType.String,
          required: true,
          min_length: 5,
          max_length: 200,
        },
      ],
    });
  }

  async exec(interaction) {
    const type = interaction.options.getString('type', true);
    const feature = interaction.options.getString('feature', true);

    await this.client.database.query(
      'INSERT INTO requested (username, request) VALUES (?,?)',
      [interaction.user.username, `${type} - ${feature}`],
    );

    const embed =
      EmbedFormatter.plainEmbed('#FF69B4').setDescription('Request Submitted!');

    return interaction.editReply({ embeds: [embed] });
  }
}
