const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { permissionType } = require("../../../utilities/permissions");
const { anyUsage } = require("../../../utilities/utilities");
const { db } = require("../../../models/db");

module.exports = class TrustedClearCommand extends Command {
	constructor() {
		super("trustedClear", {
			aliases: ["trusted clear"],
			category: "permissions",
			channel: "guild",
			description: {
				content: "Clears the trusted role in a server.",
				usage: "trusted clear",
				examples: [
					"trusted clear",
				],
			},
		});
	}

	exec(message) {
		db.query("SELECT * FROM permissions WHERE guild_id = ? AND permission_type = ?", [message.guild.id, permissionType.ROLE], function(err, row) {
			if (row.length === 0) {
				const noTrustedRole = new MessageEmbed()
					.setDescription(`There is no trusted role set in this server. To set a trusted role, use the ${anyUsage(message.guild, message.client, "trusted set")} command.`)
					.setColor("RED");
				return message.channel.send({ embeds: [noTrustedRole] });
			}

			const embed = new MessageEmbed()
				.setDescription(`Successfully cleared the trusted role. To reset the trusted role, use the ${anyUsage(message.guild, message.client, "trusted set")} command.`)
				.setColor("BLUE");

			db.query("DELETE FROM permissions WHERE guild_id = ? and permission_type = ?", [message.guild.id, permissionType.ROLE]);
			return message.channel.send({ embeds: [embed] });
		});
	}
};
