const { Command, Flag } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { noVoiceServerAndMod, permissionType } = require("../../../utilities/permissions");
const { anyUsage } = require("../../../utilities/utilities");
const { db } = require("../../../models/db");

module.exports = class TrustedCommand extends Command {
	constructor() {
		super("trusted", {
			aliases: ["trusted"],
			category: "permissions",
			channel: "guild",
			description: {
				content: "View the trusted role in a server.",
				usage: "trusted",
				examples: [
					"trusted",
				],
			},
		});
	}

	userPermissions(message) {
		return noVoiceServerAndMod(message);
	}

	*args() {
		const method = yield {
			type: [
				["trustedSet", "set"],
				["trustedClear", "clear"],
			],
		};
		if (method) return Flag.continue(method);
	}

	exec(message) {
		db.query("SELECT * FROM permissions WHERE guild_id = ? AND permission_type = ?", [message.guild.id, permissionType.ROLE], function(err, row) {
			if (row.length === 0) {
				const noRoleEmbed = new MessageEmbed()
					.setDescription(`The trusted role has not been set in this server. To set the trusted role, use the ${anyUsage(message.guild, message.client, "trusted set")} command.`)
					.setColor("RED");
				return message.channel.send({ embeds: [noRoleEmbed] });
			}

			const embed = new MessageEmbed()
				.setDescription(`The trusted role in this server is currently set to ${message.guild.roles.cache.get(row[0].role_id)}. To clear the trusted role, use the ${anyUsage(message.guild, message.client, "trusted clear")} command.`)
				.setColor("BLUE");

			return message.channel.send({ embeds: [embed] });
		});
	}
};
