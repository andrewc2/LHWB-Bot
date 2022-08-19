const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, Colors, ButtonStyle, ComponentType } = require('discord.js');
const { logger } = require('./winstonLogging');

const previousButton = new ButtonBuilder()
	.setCustomId('previousButton')
	.setLabel('Previous')
	.setStyle(ButtonStyle.Secondary);

const nextButton = new ButtonBuilder()
	.setCustomId('nextButton')
	.setLabel('Next')
	.setStyle(ButtonStyle.Secondary);

const deleteButton = new ButtonBuilder()
	.setCustomId('deleteButton')
	.setLabel('Delete')
	.setStyle(ButtonStyle.Danger);

module.exports.pagination = async (message, embedArray, deletable = true) => {

	if (embedArray.length === 0) {
		const notEnoughInfoEmbed = new EmbedBuilder()
			.setDescription('There is not enough information for this command to work right now. Try again later.')
			.setColor(Colors.Red);
		return message.interaction ?
			message.interaction.editReply({ embeds: [notEnoughInfoEmbed] }) :
			message.channel.send({ embeds: [notEnoughInfoEmbed] });
	}

	const sendPayload = embedArray.length === 1 ?
		deletable === true ?
			{ embeds: [embedArray[0]], components: [new ActionRowBuilder().addComponents(deleteButton)] } :
			{ embeds: [embedArray[0]] }
		:
		deletable === true ?
			{ embeds: [embedArray[0]], components: [new ActionRowBuilder().addComponents(previousButton, nextButton, deleteButton)] } :
			{ embeds: [embedArray[0]], components: [new ActionRowBuilder().addComponents(previousButton, nextButton)] };

	const paginationHandler = (sentInteraction) => {
		let i = 0;
		const filter = async (interaction) => {
			await interaction.deferUpdate();
			return interaction.user.id === message.author.id;
		};

		const collector = sentInteraction.createMessageComponentCollector({ filter, componentType: ComponentType.Button, idle: 20000 });

		collector.on('collect', (interaction) => {
			if (interaction.customId === 'deleteButton') {
				interaction.deleteReply();
			}
			else if (interaction.customId === 'nextButton') {
				i++;
				if (i >= embedArray.length) i = 0;
				interaction.editReply({
					embeds: [embedArray[i]],
				});
			}
			else {
				i--;
				if (i < 0) i = embedArray.length - 1;
				interaction.editReply({
					embeds: [embedArray[i]],
				});
			}
		},
		);

		collector.on('end', () => {
			sentInteraction.edit({ components: [] })
				.catch((err) => {
					logger.log('warn', err);
				});
		});
	};

	message.interaction ?
		await message.interaction.editReply(sendPayload)
			.then(interaction => paginationHandler(interaction)) :
		message.channel.send(sendPayload)
			.then(interaction => paginationHandler(interaction));
};
