const { Command } = require("discord-akairo");
const { commandUsage } = require("../../utilities/utilities");
const { fetchFM } = require("./fmUtilities.js");

class LastFMSearchCommand extends Command {
	constructor() {
		super("lfmsearch", {
			aliases: ["lfm search"],
			category: "fm",
			description: {
				content: "Sets your lastfm profile.",
				usage: "lfm search [last.fm]",
				examples: [
					"lfm search iAndrewC",
				],
			},
			args: [
				{
					id: "username",
					type: "string",
					otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage),
				},
			],
		});
	}

	exec(message, args) {
		fetchFM(message, args.username);
	}
}

module.exports = LastFMSearchCommand;
