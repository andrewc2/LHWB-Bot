const { Listener } = require('discord-akairo');
const voiceServers = require('../../../voice-servers.json');
const { EmbedBuilder, Colors } = require('discord.js');

module.exports = class MessageCommandMissingPermission extends Listener {
  constructor() {
    super('messageCommandMissingPermission', {
      event: 'missingPermissions',
      category: 'messageCommandHandler',
      emitter: 'messageCommandHandler',
    });
  }

  exec(message, command, type, missing) {
    const embed = new EmbedBuilder()
      .setColor(Colors.Red);

    const getChannel = () => {
      return message.client.channels.cache.get(voiceServers.find(x => x.server_id === message.guild.id).channel_id).name;
    };

    if (type === 'client') {
      embed
        .setDescription(`I cannot use the **${command.aliases[0]}** command in this server as I am missing the \`${missing.join(' ')}\` permissions. Try again later.`);
    }
    else {
      switch (missing) {
      case 'Server':
        embed.setDescription(`You cannot use the **${command.aliases[0]}** command in this server. :x:`);
        break;
      case 'Voice':
        embed.setDescription(`You must be in the **${getChannel()}** voice channel in order to use the **${command.aliases[0]}** command. :grinning:`);
        break;
      case 'Channel':
        embed.setDescription(`The **${command.aliases[0]}** command can only be used in a spam channel.`);
        break;
      case 'Role':
        embed.setDescription(`You don't have the correct permissions to use the **${command.aliases[0]}** command. :pensive:`);
        break;
      default:
        embed.setDescription(`You do not have have permission to use the **${command.aliases[0]}** command. :confused:`);
      }
    }

    return message.channel.send({ embeds: [embed] });
  }
};
