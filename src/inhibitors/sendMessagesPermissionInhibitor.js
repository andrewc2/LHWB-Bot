const { Inhibitor } = require('discord-akairo');
const { PermissionsBitField } = require('discord.js');

module.exports = class SendMessagesPermissionInhibitor extends Inhibitor {
	constructor() {
		super('sendMessagesPermissionInhibitor', {
			reason: 'sendMessagesPermissions',
			type: 'all',
		});
	}

	async exec(message) {
		if (!message.interaction && message.guild) {
			return !(message.channel)
				.permissionsFor(message.guild.members.me)
				.has([PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]);
		}
		return false;
	}
};
