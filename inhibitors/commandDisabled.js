const { Inhibitor } = require("discord-akairo");

class CommandDisabledInhibitor extends Inhibitor {
	constructor() {
		super("commandDisabled", {
			reason: "Command Disabled Globally",
		});
	}

	async exec(message, command) {
		const blacklist = this.client.settings.get(command.id, "command");
		if (blacklist) return true;
	}
}

module.exports = CommandDisabledInhibitor;
