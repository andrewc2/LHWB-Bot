const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { permissionType } = require("../../../utilities/permissions");
const { anyUsage } = require("../../../utilities/utilities");
const { db } = require("../../../models/db");

module.exports = class SpamAddCommand extends Command {
	constructor() {
		super("spamAdd", {
			aliases: ["spam add"],
			category: "permissions",
			channel: "guild",
			description: {
				content: "Add a spam channel to a server.",
				usage: "spam add <channel>",
				examples: [
					"spam add #bots",
				],
			},
			args: [
				{
					id: "channel",
					type: "textChannel",
					match: "content",
					default: (message) => {
						if (message.channel.isThread()) return message.channel.parent;
						return message.channel;
					},
				},
			],
		});
	}

	async exec(message, { channel }) {
		const [row] = await db.promise().query("SELECT COUNT(channel_id) AS NumberOfChannels FROM `permissions` WHERE guild_id = ? AND permission_type = ?", [message.guild.id, permissionType.CHANNEL]);

		if (row[0]["NumberOfChannels"] >= 10) {
			const maxLimit = new MessageEmbed()
				.setDescription(`Sorry, you've reached the limit of channels that can be set as spam channels. Use ${anyUsage(message.guild, message.client, "spam remove")} to remove a spam channel.`)
				.setColor("RED");
			return message.channel.send({ embeds: [maxLimit] });
		}

		db.query("SELECT * FROM permissions WHERE guild_id = ? AND channel_id = ? AND permission_type = ?", [message.guild.id, channel.id, permissionType.CHANNEL], function(err, row) {
			if (row.length > 0) {
				const isSpamAlreadyEmbed = new MessageEmbed()
					.setDescription(`${channel.name} is already a spam channel. Do ${anyUsage(message.guild, message.client, `spam remove ${channel.name}`)} to remove ${channel.name} as a spam channel.`)
					.setColor("RED");
				return message.channel.send({ embeds: [isSpamAlreadyEmbed] });
			}

			const embed = new MessageEmbed()
				.setDescription(`Successfully made ${channel.name} a spam channel. To remove ${channel.name} as a spam channel, use the ${anyUsage(message.guild, message.client, "spam remove")} command.`)
				.setColor("DARK_BLUE");

			db.query("INSERT INTO permissions (guild_id, channel_id, permission_type) VALUES (?,?,?)", [message.guild.id, channel.id, permissionType.CHANNEL]);
			return message.channel.send({ embeds: [embed] });
		});
	}
};
