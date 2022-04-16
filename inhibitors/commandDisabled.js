const { Inhibitor } = require("discord-akairo");

class CommandDisabledInhibitor extends Inhibitor {
	constructor() {
		super("commandDisabled", {
			reason: "commandDisabledGlobally",
		});
	}

	async exec(message, command) {
		const blacklist = this.client.settings.get(command.id, "command");
		if (blacklist) return true;
	}
}

module.exports = CommandDisabledInhibitor;
