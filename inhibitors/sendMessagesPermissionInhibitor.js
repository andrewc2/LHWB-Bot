const { Inhibitor } = require("discord-akairo");
const { Permissions } = require("discord.js");

module.exports = class SendMessagesPermissionInhibitor extends Inhibitor {
	constructor() {
		super("sendMessagesPermissionInhibitor", {
			reason: "sendMessagesPermissions",
			type: "all",
		});
	}

	async exec(message) {
		if (!message.interaction && message.guild && message.channel.isText()) {
			return !(message.channel)
				.permissionsFor(message.guild.me)
				.has([Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]);
		}
		return false;
	}
};
