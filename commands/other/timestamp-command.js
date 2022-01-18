const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { DateTime } = require("luxon");
const { commandUsage } = require("../../utilities/utilities");

class TimeStampCommand extends Command {
	constructor() {
		super("timestamp", {
			aliases: ["timestamp"],
			category: "other",
			description: {
				content: "Convert time given to a discord timestamp.",
				usage: "timestamp [time] [timezone]",
				examples: [
					"timestamp [time] [timezone]",
				],
			},
			args: [
				{
					id: "time",
					type: "string",
					otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage),
				},
				{
					id: "timezone",
					type: "string",
					match: "rest",
					otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage),
				},
			],
		});
	}

	exec(message, args) {
		const embed = new MessageEmbed()
			.setTitle("Timestamp")
			.setColor("#9979FF")

		const d = new Date();
		console.log(d);
		console.log(args.time.toISOString());
		console.log(args.timezone);

		//const time = DateTime.fromISO(args.time.toISOString()).setZone(args.timezone);
		//console.log(time);

		/* 	const endTime = DateTime.fromISO(event.enddate.toISOString()).setZone("America/New_York");
			if (startDate > DateTime.local().setZone("America/New_York")) {
				const dateUntil = startDate.diff(DateTime.local().setZone("America/New_York")).toFormat("d 'Days' h 'Hours' m 'Minutes' s 'Seconds");
				allEvents.push(`${event.name} - <t:${startDate.toSeconds()}> - <t:${endTime.toSeconds()}:t> (Local)\n${dateUntil}\n\n`);
			}
			else {
				allEvents.push(`${event.name} - <t:${startDate.toSeconds()}> - <t:${endTime.toSeconds()}:t> (Local)\n\n`);
			}
		if (allEvents.length < 1) return message.channel.send({ embeds: [embed.setDescription("There are no events scheduled. :sob:")] }); */
		return message.channel.send({ embeds: [embed.setDescription("Test")] });
	}
}

module.exports = TimeStampCommand;
