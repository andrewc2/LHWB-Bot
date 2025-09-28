import {
  ChatInputCommandInteraction,
  ColorResolvable,
  EmbedBuilder,
  GuildMember,
  ImageSize,
  User,
} from 'discord.js';

import { DiscordUtil } from './DiscordUtil.js';

export enum StandardColours {
  Success = '#43B581',
  Failure = '#F04747',
}

enum PresenceColours {
  Idle = '#FAA61A',
  Offline = '#747F8D',
  DoNotDisturb = '#F04747',
  Available = '#43B581',
}

export class EmbedFormatter {
  static getColourFromActivity(user: User | GuildMember) {
    if (user instanceof GuildMember) {
      if (!user.presence?.status) return PresenceColours.Offline;
      switch (user.presence?.status) {
        case 'idle':
          return PresenceColours.Idle;
        case 'offline':
          return PresenceColours.Offline;
        case 'dnd':
          return PresenceColours.DoNotDisturb;
        default:
          return PresenceColours.Available;
      }
    }
    return StandardColours.Success;
  }

  static standardUserEmbed(
    interaction: ChatInputCommandInteraction,
    user: User,
    avatar?: boolean,
    avatarSize: ImageSize = 128,
    getGuildAvatar = true,
  ) {
    const relative = interaction.guild
      ? (interaction.guild.members.cache.get(user.id) ?? user)
      : user;

    const embed = new EmbedBuilder().setColor(
      this.getColourFromActivity(relative),
    );

    if (avatar)
      embed.setAuthor({
        name: user.username,
        iconURL: DiscordUtil.getUserAvatar(
          relative,
          avatarSize,
          getGuildAvatar,
        ),
        url: DiscordUtil.getUserAvatar(relative, avatarSize, getGuildAvatar),
      });
    return embed;
  }

  static standardSuccessEmbed(): EmbedBuilder {
    return new EmbedBuilder().setColor(StandardColours.Success);
  }

  static standardErrorEmbed(): EmbedBuilder {
    return new EmbedBuilder().setColor(StandardColours.Failure);
  }

  static notMusicServer(): EmbedBuilder {
    return this.standardErrorEmbed().setDescription(
      'Sorry, this command can only be used in music servers.',
    );
  }

  static plainEmbed(colour: ColorResolvable) {
    return new EmbedBuilder().setColor(colour);
  }
}
