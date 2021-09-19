const { Listener } = require("discord-akairo");
const { logger } = require("../../utilities/logging");

module.exports = class ReadyListener extends Listener {
	constructor() {
		super("readyListener", {
			emitter: "client",
			category: "client",
			event: "ready",
		});
	}

	exec() {
		logger.log("info", `Logged in as ${this.client.user.tag} (${this.client.user.id})`)
	}
}
