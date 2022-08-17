const { Listener } = require("discord-akairo");
const { logger } = require("../../utilities/logging");

class ErrorListener extends Listener {
	constructor() {
		super("errorListener", {
			event: "error",
			category: "commandHandler",
			emitter: "commandHandler",
		});
	}

	exec(err, message, command) {
		logger.log("error", `CommandHandler Error: ${err}\nWith Command: ${command.id ?? `Unknown Command`}`);
		const embed = this.client.util
			.embed()
			.setDescription("An unknown error occurred. :pensive:")
			.setColor("RED");
		return message.channel.send({ embeds: [embed] });
	}
}

module.exports = ErrorListener;
