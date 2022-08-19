const { Listener } = require('discord-akairo');
const { logger } = require('../../utilities/winstonLogging');
const { Colors, EmbedBuilder } = require('discord.js');

module.exports = class MessageCommandErrorListener extends Listener {
	constructor() {
		super('messageCommandErrorListener', {
			event: 'error',
			category: 'messageCommandHandler',
			emitter: 'messageCommandHandler',
		});
	}

	exec(err, message, command) {
		logger.log('error', `MessageCommandHandler Error: ${err} With Command: ${command.aliases[0] ?? 'Unknown Command'}`);
		const embed = new EmbedBuilder()
			.setDescription('An unknown error occurred. :pensive:')
			.setColor(Colors.Red);
		return message.channel.send({ embeds: [embed] });
	}
};
