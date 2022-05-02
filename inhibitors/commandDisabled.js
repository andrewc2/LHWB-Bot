const { Inhibitor } = require("discord-akairo");

class CommandDisabledInhibitor extends Inhibitor {
	constructor() {
		super("commandDisabled", {
			reason: "commandDisabledGlobally",
		});
	}

	async exec(message, command) {
		const commandID = command.prefixId ?? command.id
		const blacklist = this.client.settings.get(commandID, "command");
		if (blacklist) return true;
	}
}

module.exports = CommandDisabledInhibitor;
