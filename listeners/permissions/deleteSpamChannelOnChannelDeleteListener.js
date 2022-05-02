const { Listener } = require("discord-akairo");
const { db } = require("../../models/db");

module.exports = class DeleteSpamChannelOnChannelDeleteListener extends Listener {
	constructor() {
		super("deleteSpamChannelOnChannelDelete", {
			event: "channelDelete",
			emitter: "client",
			category: "permissions",
		});
	}

	exec(channel) {
		if (!channel.guild) return;
		db.query("DELETE FROM permissions WHERE channel_id = ?", [channel.id]);
	}
};
