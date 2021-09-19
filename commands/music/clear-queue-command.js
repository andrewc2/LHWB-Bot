const { Command } = require("discord-akairo");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { db } = require("../../models/db");
const { CLEAR_QUEUE, SEARCH_QUEUE } = require("../../models/music-queries");
const { cmdRestrictions } = require("../../utilities/permissions");

module.exports = class ClearQueueCommand extends Command {
	constructor() {
		super("clearqueue", {
			aliases: ["clearqueue", "cq"],
			category: "music",
			description: {
				content: "Clears the queue.",
				usage: "clearqueue [song]",
				examples: ["clearqueue"],
			},
			channel: "guild",
		});
	}

	async userPermissions(message) {
		return await cmdRestrictions(message);
	}

	async exec(message) {
		const embed = new MessageEmbed().setColor("GREEN");

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId("clear")
					.setLabel("Clear")
					.setStyle("DANGER"),
				new MessageButton()
					.setCustomId("cancel")
					.setLabel("Cancel")
					.setStyle("SECONDARY"),
			);

		db.query(SEARCH_QUEUE, [message.guild.id], function(err, result) {
			if (result.length > 0) {
				const buttonEmbed = new MessageEmbed()
					.setDescription(`${message.author}, Are you sure you want to clear the queue?`)
					.setColor("YELLOW");
				message.channel.send({ embeds: [buttonEmbed], components: [row] })
					.then(interaction => {
						const filter = async i => {
							await i.deferUpdate();
							return i.user.id === message.author.id;
						};
						interaction.awaitMessageComponent({ filter, componentType: "BUTTON", time: 10000 })
							.then(i => {
								if (i.customId === "clear") {
									db.query(CLEAR_QUEUE, [message.guild.id]);
									i.editReply({ embeds: [embed.setDescription("The queue has been cleared 🧹")], components: [] });
								}
								else {
									i.deleteReply();
								}
							})
							.catch(() => interaction.edit({ components: [] }));
					});
			}
			else {
				return message.channel.send({ embeds: [
					embed.setDescription("The queue is already empty.")
						.setColor("RED"),
				] });
			}
		});
	}
};