const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType, EmbedBuilder, Colors } = require('discord.js');
const voiceServers = require('../../voice-servers.json');
const { db } = require('../../models/db');

module.exports = class OwnerBanSlashCommand extends SlashCommand {
  constructor() {
    super('ownerBan', {
      name: 'owner ban',
      parentCommand: 'owner',
      shortName: 'ban',
      ownerOnly: true,
      category: 'owner',
      prefixId: 'botBan',
      commandType: 'sub',
      slashOptions: [
        {
          name: 'entity',
          description: 'The entity to bot ban',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
      ],
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const entity = interaction.options.getUser('entity');
    const protectedUsers = [this.client.ownerID, voiceServers.map(x => x.server_id).join(', '), this.client.user.id];

    const embed = new EmbedBuilder()
      .setColor(Colors.Green);

    const failEmbed = new EmbedBuilder()
      .setColor(Colors.Red);

    if (protectedUsers.includes(entity.id)) {
      return interaction.editReply({
        embeds: [
          failEmbed
            .setDescription(`${entity} cannot be bot banned as it is a protected property.`),
        ],
      });
    }

    const isBanned = this.client.blacklist.has(entity.id);

    if (isBanned) {
      return interaction.editReply({
        embeds: [
          failEmbed
            .setDescription(`${entity} is already bot banned.`),
        ],
      });
    }

    this.client.blacklist.set(entity.id, entity.id);
    db.query('INSERT INTO botBanList (entity) VALUES (?)', [entity.id]);
    return interaction.editReply({ embeds: [embed.setDescription(`${entity} has been bot banned.`)] });
  }
};
