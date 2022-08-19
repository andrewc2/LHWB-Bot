const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Colors, ButtonStyle, ComponentType } = require('discord.js');
const { db } = require('../../models/db');
const { CLEAR_QUEUE, SEARCH_QUEUE } = require('../../models/musicQueries');
const { cmdRestrictions } = require('../../utilities/permissions');

module.exports = class ClearQueueMessageCommand extends MessageCommand {
	constructor() {
		super('clearQueue', {
			aliases: ['clearqueue', 'cq'],
			category: 'music',
			description: {
				content: 'Clears the queue.',
				usage: 'clearqueue [song]',
				examples: ['clearqueue'],
			},
			channel: 'guild',
		});
	}

	async userPermissions(message) {
		return await cmdRestrictions(message);
	}

	async exec(message) {
		const embed = new EmbedBuilder().setColor(Colors.Green);

		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('clear')
					.setLabel('Clear')
					.setStyle(ButtonStyle.Danger),
				new ButtonBuilder()
					.setCustomId('cancel')
					.setLabel('Cancel')
					.setStyle(ButtonStyle.Secondary),
			);

		db.query(SEARCH_QUEUE, [message.guild.id], function(err, result) {
			if (result.length > 0) {
				const buttonEmbed = new EmbedBuilder()
					.setDescription(`${message.author}, Are you sure you want to clear the queue?`)
					.setColor(Colors.Yellow);
				message.channel.send({ embeds: [buttonEmbed], components: [row] })
					.then(interaction => {
						const filter = async i => {
							await i.deferUpdate();
							return i.user.id === message.author.id;
						};
						interaction.awaitMessageComponent({ filter, componentType: ComponentType.Button, time: 10000 })
							.then(i => {
								if (i.customId === 'clear') {
									db.query(CLEAR_QUEUE, [message.guild.id]);
									i.editReply({ embeds: [embed.setDescription('The queue has been cleared 🧹')], components: [] });
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
					embed.setDescription('The queue is already empty.')
						.setColor(Colors.Red),
				] });
			}
		});
	}
};
