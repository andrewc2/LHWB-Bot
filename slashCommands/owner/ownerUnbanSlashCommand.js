const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType, EmbedBuilder, Colors } = require('discord.js');
const { db } = require('../../models/db');

module.exports = class OwnerUnbanSlashCommand extends SlashCommand {
  constructor() {
    super('ownerUnban', {
      name: 'owner unban',
      parentCommand: 'owner',
      shortName: 'unban',
      ownerOnly: true,
      category: 'owner',
      prefixId: 'botUnban',
      commandType: 'sub',
      slashOptions: [
        {
          name: 'entity',
          description: 'The entity to bot unban',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
      ],
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const entity = interaction.options.getUser('entity');

    const embed = new EmbedBuilder()
      .setColor(Colors.Green);

    const failEmbed = new EmbedBuilder()
      .setColor(Colors.Red);

    const isBanned = this.client.blacklist.has(entity.id);

    if (!isBanned) {
      return interaction.editReply({ embeds: [
        failEmbed
          .setDescription(`${entity} is not bot banned.`),
      ] },
      );
    }

    this.client.blacklist.delete(entity.id);
    db.query('DELETE FROM botBanList WHERE entity = ?', [entity.id]);
    return interaction.editReply({ embeds: [embed.setDescription(`${entity} has been bot unbanned.`)] });
  }
};
