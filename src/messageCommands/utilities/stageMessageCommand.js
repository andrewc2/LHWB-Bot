const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');
const {	joinVoiceChannel } = require('@discordjs/voice');
const { isVoiceServerAndMod } = require('../../utilities/permissions');
const { logger } = require('../../utilities/winstonLogging');
const voiceServers = require('../../../voice-servers.json');

module.exports = class StageMessageCommand extends MessageCommand {
	constructor() {
		super('stage', {
			aliases: ['stage'],
			category: 'utility',
			cooldown: 30000,
			ratelimit: 1,
			description: {
				content: 'Join the servers stage channel.',
				usage: 'stage',
				examples: [
					'stage',
				],
			},
		});
	}

	async userPermissions(message) {
		return isVoiceServerAndMod(message);
	}

	exec(message) {
		const channel = message.client.channels.cache.get(voiceServers.find(x => x.server_id === message.guild.id).stage_channel_id);
		const connection = joinVoiceChannel({
			channelId: channel.id,
			guildId: channel.guild.id,
			adapterCreator: channel.guild.voiceAdapterCreator,
		});

		if (!channel) return logger.log('warn', 'I cannot find the stage channel');

		function handleStageConnection() {
			void message.guild.members.me.voice.setSuppressed(false);
			connection.state.subscription.player.unpause();
			const embed = new EmbedBuilder()
				.setDescription('Switched to the stage channel.')
				.setColor('#9979FF');
			return message.channel.send({ embeds: [embed] });
		}

		setTimeout(handleStageConnection, 1000);
	}
};
