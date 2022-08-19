const { Listener } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const voiceServers = require('../../../voice-servers.json');

module.exports = class SlashCommandMissingPermissionListener extends Listener {
	constructor() {
		super('slashCommandMissingPermissionListener', {
			event: 'missingPermissions',
			category: 'slashCommandHandler',
			emitter: 'slashCommandHandler',
		});
	}

	exec(message, command, type, missing) {
		const embed = new EmbedBuilder()
			.setColor(Colors.Red);

		const getChannel = () => {
			return message.client.channels.cache.get(voiceServers.find(x => x.server_id === message.guild.id).channel_id).name;
		};

		if (type === 'client') {
			embed.setDescription(
				`I cannot use the **${command.name.toLowerCase()}** command in this server as I am missing the \`${missing.join(', ')}\` permission. Try again later.`,
			);
		}
		else {
			switch (missing) {
			case 'Server':
				embed.setDescription(`You cannot use the **${command.name}** command in this server. :x:`);
				break;
			case 'Voice':
				embed.setDescription(`You must be in the **${getChannel()}** voice channel in order to use the **${command.name}** command. :grinning:`);
				break;
			case 'Channel':
				embed.setDescription(`The **${command.name}** command can only be used in a spam channel.`);
				break;
			case 'Role':
				embed.setDescription(`You don't have the correct permissions to use the **${command.name}** command. :pensive:`);
				break;
			default:
				embed.setDescription(`You do not have have permission to use the **${command.name}** command. :confused:`);
			}
		}

		return message.interaction.reply({ embeds: [embed], ephemeral: true });
	}
};
