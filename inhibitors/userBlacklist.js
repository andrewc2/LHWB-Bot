const { Inhibitor } = require("discord-akairo");

class UserBlacklistInhibitor extends Inhibitor {
	constructor() {
		super("userBlacklist", {
			reason: "Bot Banned",
			type: "pre",
		});
	}

	async exec(message) {
		const blacklist = this.client.settings.get(message.author.id, "ban");
		if (blacklist) return true;
	}
}

module.exports = UserBlacklistInhibitor;
