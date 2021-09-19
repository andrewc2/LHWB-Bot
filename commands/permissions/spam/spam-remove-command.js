const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { permissionType } = require("../../../utilities/permissions");
const { anyUsage } = require("../../../utilities/utilities");
const { db } = require("../../../models/db");

module.exports = class SpamRemoveCommand extends Command {
	constructor() {
		super("spamRemove", {
			aliases: ["spam remove"],
			category: "permissions",
			channel: "guild",
			description: {
				content: "Removes a spam channel from a server.",
				usage: "spam remove <channel>",
				examples: [
					"spam remove #bots",
				],
			},
			args: [
				{
					id: "channel",
					type: "textChannel",
					match: "content",
					default: message => message.channel,
				},
			],
		});
	}

	exec(message, { channel }) {
		db.query("SELECT * FROM permissions WHERE guild_id = ? AND channel_id = ? AND permission_type = ?", [message.guild.id, channel.id, permissionType.CHANNEL], function(err, row) {
			if (row.length === 0) {
				const isNotSpamEmbed = new MessageEmbed()
					.setDescription(`${channel.name} is not a spam channel. Do ${anyUsage(message.guild, message.client, `spam add ${channel.name}`)} to add ${channel.name} as a spam channel.`)
					.setColor("RED");
				return message.channel.send({ embeds: [isNotSpamEmbed] });
			}

			const embed = new MessageEmbed()
				.setDescription(`Successfully removed ${channel.name} as a spam channel. To readd ${channel.name} as a spam channel, use the ${anyUsage(message.guild, message.client, "spam add")} command.`)
				.setColor("DARK_BLUE");

			db.query("DELETE FROM permissions WHERE guild_id = ? AND channel_id = ? and permission_type = ?", [message.guild.id, channel.id, permissionType.CHANNEL]);
			return message.channel.send({ embeds: [embed] });
		});
	}
};
