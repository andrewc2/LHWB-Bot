const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");
const { GET_RECENT } = require("../../models/music-queries");
const { dequeue, play, randomSong, searchQueue } = require("../../music");
const { getVoiceConnection } = require("@discordjs/voice");
const { cmdRestrictions } = require("../../utilities/permissions");

module.exports = class SkipCommand extends Command {
	constructor() {
		super("skip", {
			aliases: ["skip", "lskip"],
			category: "music",
			description: {
				content: "Skips the current song.",
				usage: "skip",
				examples: ["skip"],
			},
			channel: "guild",
		});
	}

	async userPermissions(message) {
		return await cmdRestrictions(message);
	}

	async exec(message) {
		const connection = getVoiceConnection(message.guild.id);

		if (!connection) {
			return message.channel.send({ embeds: [
				new MessageEmbed()
					.setDescription("Connection to voice channel not found.")
					.setColor("RED"),
			] });
		}

		const embed = new MessageEmbed()
			.setDescription("Song skipped. Finding a new song... :musical_note:")
			.setColor("GREEN");

		const [result] = await db.promise().query(GET_RECENT, [message.guild.id, 1]);
		if (result[0]["queued_by"] !== null) {dequeue(result[0]["song_detail_id"], message.guild.id);}
		setTimeout(async () => {play(await searchQueue(message.guild) || await randomSong(message.guild), connection, this.client); }, 1000);
		return message.channel.send({ embeds: [embed] });
	}
};
