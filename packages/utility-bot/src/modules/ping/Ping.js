import { DiscordUtil, EmbedFormatter } from '@lhwb/shared';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Colors,
} from 'discord.js';

const MAX_CHARACTER_LENGTH = 1930;

export const NO_MEMBERS =
  'It looks like nobody has this pinglist assigned. :confused:';
export const PINGLIST_NOT_FOUND = (name, client) =>
  `I couldn't find a pinglist with the name ${name}. You can view available pinglist's in this server by using the ${DiscordUtil.formatCommandAsMention('lping list', client)} command.`;

export default class Ping {
  static async pingAutocomplete(interaction, client) {
    if (!interaction.guild) return interaction.respond([]);
    const input = interaction.options.getString('pinglist', true).toLowerCase();

    const query =
      input.length > 0
        ? 'SELECT `name`, `guildId` FROM pinglist WHERE `guildId` = ? AND `name` LIKE ? LIMIT 10'
        : 'SELECT `name`, `guildId` FROM pinglist WHERE `guildId` = ? ORDER BY `name` LIMIT 10';
    const params =
      input.length > 0
        ? [interaction.guild.id, `${input}%`]
        : [interaction.guild.id];

    const row = await client.database.query(query, params);
    const result = row.map((x) => ({
      name: x.name,
      value: x.name,
    }));

    await interaction.respond(result);
  }

  static async pinglistExists(name, guildId, client) {
    const row = await client.database.query(
      'SELECT `name`, `guildId` FROM pinglist WHERE name = ? AND guildId = ?',
      [name, guildId],
    );
    return row.length !== 0;
  }

  static pinglistWarningButton() {
    return new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('send')
        .setLabel('PING MANY PEOPLE')
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setCustomId('cancel')
        .setLabel('CANCEL PING')
        .setStyle(ButtonStyle.Secondary),
    );
  }

  static pinglistJoinButton(name) {
    return new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(JSON.stringify({ type: 'join', id: name }))
        .setLabel('Join Pinglist')
        .setEmoji('🔔')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId(JSON.stringify({ type: 'drop', id: name }))
        .setLabel('Leave Pinglist')
        .setEmoji('🚮')
        .setStyle(ButtonStyle.Secondary),
    );
  }

  static requestPinglistEmbed(name, interaction) {
    return EmbedFormatter.plainEmbed(Colors.Blurple).setDescription(
      `${DiscordUtil.formatAsUserAndMention(interaction.user)} has requested the **${name}** pinglist. Please wait while this pinglist generates...`,
    );
  }

  static async pingFollowup(name, message, interaction, client) {
    const sendNoMembers = () =>
      interaction.editReply({
        embeds: [
          EmbedFormatter.standardErrorEmbed().setDescription(NO_MEMBERS),
        ],
        components: [],
      });

    const chunk = (array, size) => {
      const chunks = [];
      for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
      }
      return chunks;
    };

    // Initial reply
    await interaction.editReply({
      embeds: [this.requestPinglistEmbed(name, interaction)],
      components: [],
    });

    // Fetch user IDs from DB
    const row = await client.database.query(
      'SELECT u.userId FROM user as u INNER JOIN userPinglist as up ON u.userId = up.userId INNER JOIN pinglist as p ON p.id = up.pinglistId WHERE p.guildId = ? AND p.name = ?',
      [interaction.guild.id, name],
    );

    if (!row.length) return sendNoMembers();

    // Fetch mentions in chunks of 99
    const resultChunks = chunk(row, 99);
    let mentions = [];

    try {
      mentions = (
        await Promise.all(
          resultChunks.map(async (group) => {
            const members = await interaction.guild.members.fetch({
              user: group.map((u) => u.userId),
            });
            return members.map((m) => m.user.toString());
          }),
        )
      ).flat();
    } catch (err) {
      client.logger.warn(err);
    }

    if (!mentions.length) return sendNoMembers();

    // Split mentions to respect MAX_CHARACTER_LENGTH
    const safeChunkSize = Math.floor(MAX_CHARACTER_LENGTH / 21); // ~21 chars per mention
    const sendList = chunk(mentions, safeChunkSize);

    // Send each chunk as a follow-up
    sendList.forEach((list, i) => {
      if (!list.length) return;
      const content = `${message ? `${name}: ${message.toLowerCase()}` : name} ${list.join('').trim()}`;
      const payload =
        i === 0
          ? { content, components: [this.pinglistJoinButton(name)] }
          : { content };
      interaction.followUp(payload);
    });
  }
}
