import Command from '../../structure/commands/Command.js';
import { ApplicationCommandOptionType, EmbedBuilder, Colors } from 'discord.js';
import { database } from '../../models/database.js';

export default class OwnerBan extends Command {
  constructor() {
    super('ownerBan', {
      name: 'owner ban',
      category: 'owner',
      ownerOnly: true,
      options: [
        {
          name: 'entity',
          description: 'The entity to bot ban',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
      ],
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'owner',
        shortName: 'ban',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const entity = interaction.options.getUser('entity');
    const voiceServers = this.client.voiceServers;
    const protectedUsers = [this.client.ownerID, voiceServers.map(x => x.getGuildId()).join(', '), this.client.user.id];

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

    const isBanned = this.client.botBanned.has(entity.id);

    if (isBanned) {
      return interaction.editReply({
        embeds: [
          failEmbed
            .setDescription(`${entity} is already bot banned.`),
        ],
      });
    }

    this.client.botBanned.set(entity.id, entity.id);
    database.query('INSERT INTO botBanList (entity) VALUES (?)', [entity.id]);
    return interaction.editReply({ embeds: [embed.setDescription(`${entity} has been bot banned.`)] });
  }
}
