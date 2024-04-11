import Command from '../../structure/commands/Command.js';
import { ApplicationCommandOptionType, Colors, EmbedBuilder, escapeMarkdown, PermissionFlagsBits } from 'discord.js';
import { database } from '../../models/database.js';

export default class AwardAdd extends Command {
  constructor() {
    super('awardAdd', {
      name: 'award add',
      category: 'awards',
      userPermissions: [PermissionFlagsBits.ModerateMembers],
      options: [
        {
          name: 'user',
          description: 'The user to add an award to',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: 'award',
          description: 'The description of the award to add',
          type: ApplicationCommandOptionType.String,
          required: true,
          max_length: 100,
        },
      ],
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'award',
        shortName: 'add',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply({ fetchReply: true, ephemeral: true });
    const member = interaction.options.getMember('user');
    const award = escapeMarkdown(interaction.options.getString('award', true));

    if (!member) {
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription('The user must be in the server before you can give them an award.')
            .setColor(Colors.Red),
        ],
      });
    }

    database.query('INSERT INTO userAwards (userId, guildId, description) VALUES (?,?,?)', [member.user.id, member.guild.id, award]);
    return interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`The award "${award}" has been added successfully to ${member.user.displayName}.`)
          .setColor(Colors.Green),
      ],
    });
  }
}
