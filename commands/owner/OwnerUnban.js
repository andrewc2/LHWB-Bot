import Command from '../../structure/commands/Command.js';
import { ApplicationCommandOptionType, EmbedBuilder, Colors } from 'discord.js';
import { database } from '../../models/database.js';

export default class OwnerUnban extends Command {
  constructor() {
    super('ownerUnban', {
      name: 'owner unban',
      category: 'owner',
      ownerOnly: true,
      options: [
        {
          name: 'entity',
          description: 'The entity to bot unban',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
      ],
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'owner',
        shortName: 'unban',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const entity = interaction.options.getUser('entity');

    const embed = new EmbedBuilder()
      .setColor(Colors.Green);

    const failEmbed = new EmbedBuilder()
      .setColor(Colors.Red);

    const isBanned = this.client.botBanned.has(entity.id);

    if (!isBanned) {
      return interaction.editReply({ embeds: [
        failEmbed
          .setDescription(`${entity} is not bot banned.`),
      ] },
      );
    }

    this.client.botBanned.delete(entity.id);
    database.query('DELETE FROM botBanList WHERE entity = ?', [entity.id]);
    return interaction.editReply({ embeds: [embed.setDescription(`${entity} has been bot unbanned.`)] });
  }
}
