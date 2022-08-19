const { MessageCommand, Argument } = require('discord-akairo');
const { commandUsage } = require('../../utilities/utilities');

module.exports = class BotUnbanMessageCommand extends MessageCommand {
	constructor() {
		super('botUnban', {
			aliases: ['botunban', 'bunban'],
			category: 'bot',
			ownerOnly: true,
			description: {
				content: 'Unbans a user or server from using the bot.',
				usage: 'botunban <user|guild>',
				examples: [
					'botunban iAndrewC',
				],
			},
			args: [
				{
					id: 'user',
					type: Argument.union('user', 'guild'),
					otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage),
				},
			],
		});
	}

	exec(message) {
		return message.channel.send('tbd');
		/* const embed = new EmbedBuilder()
			.setColor("GREEN");

		const checkUser = this.client.settings.get(args.user.id, "ban");
		if (checkUser) {
			this.client.settings.delete(args.user.id, "ban");
			return message.channel.send({ embeds: [
				embed
					.setDescription(`${args.user} has been bot unbanned.`),
			] },
			);
		}
		else {
			return message.channel.send({ embeds: [
				embed
					.setDescription(`${args.user} is not bot banned.`)
					.setColor("RED"),
			] },
			);
		}*/
	}
};
