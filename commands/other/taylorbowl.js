const { Command } = require("discord-akairo");

class TaylorBowlCommand extends Command {
	constructor() {
		super("taylorbowl", {
			aliases: ["taylorbowl", "gettier", "tier", "taybowl", "bowl", "sbowl", "allmatchups", "bowlstats"],
			category: "other",
			description: {
				content: "kek",
				usage: "taylorbowl",
				examples: [
					"taylorbowl",
				],
			},
		});
	}

	exec(message) {
		message.channel.send("<:taybowl:766913883386019860>");
	}
}

module.exports = TaylorBowlCommand;
