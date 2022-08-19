const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');

module.exports = class StreamMessageCommand extends MessageCommand {
	constructor() {
		super('stream', {
			aliases: ['stream', 'livestream'],
			category: 'other',
			description: {
				content: 'Displays information about live streams.',
				usage: 'stream',
				examples: [
					'stream',
				],
			},
		});
	}

	exec(message) {
		const embed = new EmbedBuilder()
			.setColor(5218488)
			.setAuthor({
				name: 'Live Stream',
				iconURL: 'https://lhwb.dev/ts.png',
				url: 'https://speaknow.rocks:1989/player/',
			})
			.setURL('https://speaknow.rocks:1989/player/')
			.setDescription('[HLS Stream Player](https://speaknow.rocks:1989/)\n\nStream will be minimum 30sec behind from live\nIf you have issues please refresh your browser first.')
			.setFooter({ text: 'Please do not share this stream outside of this discord server, or this stream will not be able to be provided.' });
		message.channel.send({ embeds: [embed] });
	}
};
