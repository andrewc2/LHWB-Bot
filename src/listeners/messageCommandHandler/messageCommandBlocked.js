const { Listener } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { logger } = require('../../utilities/winstonLogging');

module.exports = class MessageCommandBlockedListener extends Listener {
	constructor() {
		super('messageCommandBlockedListener', {
			event: 'commandBlocked',
			category: 'messageCommandHandler',
			emitter: 'messageCommandHandler',
		});
	}

	exec(message, command, reason) {
		const embed = new EmbedBuilder()
			.setDescription(`You cannot use the \`${command.aliases[0]}\` command at the moment.`)
			.setColor(Colors.Red);

		if (reason === 'sendMessagesPermissions') {
			return logger.log('warn', reason);
		}

		switch (reason) {
		case 'botBannedInServer':
		case 'botBanned':
			embed.setDescription(`You cannot use the **${command.aliases[0]}** command at the moment.`);
			break;
		case 'guild':
			embed.setDescription(`You cannot use the **${command.aliases[0]}** command in DMs. Please try again in a server.`);
			break;
		case 'owner':
			embed.setDescription(`Only the bot owner can use the **${command.aliases[0]}** command.`);
			break;
		case 'commandChannelDisabled':
			embed.setDescription(`The **${command.aliases[0]}** command has been disabled in ${message.channel}.`);
			break;
		}

		return message.channel.send({ embeds: [embed] });
	}
};
