const { MessageCommand, Argument } = require('discord-akairo');
const { commandUsage } = require('../../utilities/utilities');
// const voiceServers = require('../../../voice-servers.json');
// const { EmbedBuilder, Colors } = require('discord.js');

module.exports = class BotBanMessageCommand extends MessageCommand {
  constructor() {
    super('botBan', {
      aliases: ['botban', 'bban'],
      category: 'admin',
      ownerOnly: true,
      description: {
        content: 'Bans a user or server from using the bot.',
        usage: 'botban <user|guild>',
        examples: [
          'botban iAndrewC',
        ],
      },
      args: [
        {
          id: 'user',
          type: Argument.union('user', 'guild'),
          otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage),
        },
      ],
    });
  }

  exec(message) {
    return message.channel.send('tbd');

    /* const embed = new EmbedBuilder()
			.setColor(Colors.Green);

		const protectedUsers = [this.client.ownerID, voiceServers.map(x => x.server_id).join(', '), this.client.user.id];
		if (protectedUsers.includes(args.user.id)) {
			return message.channel.send({ embeds: [
				embed
					.setDescription(`${args.user} cannot be bot banned as it is a protected property.`)
					.setColor(Colors.Red),
			] },
			);
		}

		const checkUser = this.client.settings.get(args.user.id, 'ban');
		if (!checkUser) {
			this.client.settings.set(args.user.id, 'ban', true);

			return message.channel.send({ embeds: [embed.setDescription(`${args.user} has been bot banned.`)] });
		}
		else {
			return message.channel.send({ embeds: [
				embed
					.setDescription(`${args.user} is already bot banned.`)
					.setColor(Colors.Red),
			] },
			);
		}*/
  }
};
