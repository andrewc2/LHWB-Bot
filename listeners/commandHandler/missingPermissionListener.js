const { Listener } = require("discord-akairo");
const voiceServers = require("../../voice-servers.json");

class MissingPermissionListener extends Listener {
	constructor() {
		super("missingPermission", {
			event: "missingPermissions",
			category: "commandHandler",
			emitter: "commandHandler",
		});
	}

	exec(message, command, type, missing) {
		const embed = this.client.util
			.embed()
			.setColor("RED");
		if (type === "client") {
			embed
				.setDescription(`I cannot use the \`${command.aliases[0]}\` command in this server as I am missing the \`${missing}\` permissions. Try again later.`);
			return message.channel.send({ embeds: [embed] });
		}
		else if (missing === "Server") {
			embed
				.setDescription(`You cannot use the \`${command.aliases[0]}\` command in this server. :x:`);
			return message.channel.send({ embeds: [embed] });
		}
		else if (missing === "Voice") {
			const channel = message.client.channels.cache.get(voiceServers.find(x => x.server_id === message.guild.id).channel_id).name;
			embed
				.setDescription(`You must be in the **${channel}** voice channel in order to use the \`${command.aliases[0]}\` command. :grinning:`);
			return message.channel.send({ embeds: [embed] });
		}
		else if (missing === "Channel") {
			embed
				.setDescription(`Does this look like a spam channel? Use the \`${command.aliases[0]}\` command in a spam channel :woman_facepalming:`);
			return message.channel.send({ embeds: [embed] });
		}
		else if (missing === "Role") {
			embed
				.setDescription(`You don't have the correct permissions to use the \`${command.aliases[0]}\` command. :pensive:`);
			return message.channel.send({ embeds: [embed] });
		}
		else {
			embed
				.setDescription(`You do not have have permission to use the \`${command.aliases[0]}\` command. :confused:`);
			return message.channel.send({ embeds: [embed] });
		}
	}
}

module.exports = MissingPermissionListener;
