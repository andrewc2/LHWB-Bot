const { MessageCommand, Flag } = require('discord-akairo');
const { EmbedBuilder, Colors, PermissionsBitField } = require('discord.js');

module.exports = class ChannelMessageCommand extends MessageCommand {
	constructor() {
		super('channel', {
			aliases: ['channel'],
			category: 'permissions',
			channel: 'guild',
			userPermissions: [PermissionsBitField.Flags.ManageGuild],
			description: {
				content: 'Use `channel disable` or `channel enable` to change a commands behaviour in a channel.',
				usage: 'channel <enable|disable> <command>',
				examples: [
					'channel enable lping',
				],
			},
		});
	}

	*args() {
		const method = yield {
			type: [
				['channelEnable', 'enable'],
				['channelDisable', 'disable'],
			],
		};

		if (method) return Flag.continue(method, true);
	}

	exec(message) {
		const failedEmbed = new EmbedBuilder()
			.setColor(Colors.Red);

		return message.channel.send({ embeds: [failedEmbed.setDescription('Please consult the help guide to use this command. :smiley:')] });
	}
};
