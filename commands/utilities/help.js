const { Command } = require("discord-akairo");
const { anyUsage } = require("../../utilities/utilities");

class HelpCommand extends Command {
	constructor() {
		super("lhelp", {
			aliases: ["lhelp"],
			category: "utilities",
			description: {
				content: "Help command.",
				usage: "lhelp [command]",
				examples: [
					"lhelp queue'",
				],
			},
			args: [
				{
					id: "command",
					type: "commandAlias",
					match: "content",
				},
			],
		});
	}

	exec(message, args) {
		const musicCommands = this.client.util
			.embed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: "png" }), message.author.displayAvatarURL({ dynamic: true, format: "png" }))
			.setTitle("LHWB Commands")
			.setDescription(`Use ${anyUsage(message.guild, this.client, `${this.id} [command]`)} for further information.\nThe full command list is available here: https://lhwb.dev/`)
			.addFields(
				{ name: "Music :musical_note:", value: "albumlist, current, queue, queue album, dequeue, clearqueue, recent, skip, tracks, rankplays, trackinfo", inline: true },
				{ name: "Albums :cd:", value: "debut, beautifuleyes, fearless, speaknow, red, 1989, reputation, lover, folklore, evermore", inline: true },
				{ name: "Tours :ticket:", value: "redguests, redsetlist, 1989ss, 1989guests, 1989setlist, repss, repguests, repsetlist", inline: true },
				{ name: "Other :wrench:", value: "countdown, danc, debtcounter, eyeroll, gif, prefix, request, stream, taze, wtny", inline: true },
				{ name: "Last.FM :notes:", value: "lfm, lfm [user], lfm clear, lfm search [user], lfm set [user]", inline: true },
				{ name: "Utilities :gear:", value: "lrestart, lversion, lhelp, rejoin", inline: true },
				{ name: "Mod :boom:", value: "botban, botunban, channel enable [cmd], channel disable [cmd], spam add [channel], spam remove [channel], trusted set [role], trusted clear, pause, resume", inline: true },
				{ name: "Owner :crown:", value: "disable, enable, lavatar, lsay, nickname, reload", inline: true },
				{ name: "Pinglists :rotating_light:", value: "lping list, lping get [list name], lping drop [list name], lping (shows lists you're on), lping [list to ping], lping create [list name], lping delete [list name]", inline: true },
			)
			.setColor("#FF69B4");

		if (!args.command || args.command.id === "lhelp") {
			return message.channel.send({ embeds: [musicCommands] });
		}
		else {
			const moduleEmbed = this.client.util
				.embed()
				.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: "png" }), message.author.displayAvatarURL({ dynamic: true, format: "png" }))
				.setTitle(args.command.id)
				.setDescription(args.command.description.content || "No content provided")
				.setColor("#FF69B4")
				.addFields(
					{ name: "Example", value: anyUsage(message.guild, this.client, `${args.command.description.examples ? args.command.description.examples.map(e => `${e}`).join("\n") : "No examples provided."}`), inline: false },
					{ name: "Usage", value: anyUsage(message.guild, this.client, `${args.command.description.usage || "No usage provided."}`), inline: false },
				);
			if (args.command.aliases.length > 0) moduleEmbed.addField("Aliases", `\`${args.command.aliases.join("`, `")}\``, false);
			return message.channel.send({ embeds: [moduleEmbed] });
		}
	}
}

module.exports = HelpCommand;
