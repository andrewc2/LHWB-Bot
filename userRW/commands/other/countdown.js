const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { DateTime } = require('luxon');
const { db } = require("../../models/db");

class CountdownCommand extends Command {
    constructor() {
        super("countdown", {
            aliases: ["countdown"],
            category: "other",
            description: {
                content: "Countdown to events.",
                usage: "countdown",
                examples: [
                    "countdown"
                ]
            }
        });
    }

    async exec(message, args) {
        const embed = new MessageEmbed()
            .setTitle("Countdowns")
            .setURL("https://www.taylorswift.com/events")
            .setColor(16711680)

        let allEvents = []
        const [rows] = await db.promise().query("SELECT * FROM `countdown` WHERE enddate > ? ORDER BY `startdate`", [DateTime.local().setZone("America/New_York").toString()])

        for (const event of rows.values()) {
            const startDate = DateTime.fromISO(event.startdate.toISOString()).setZone('America/New_York')
            const endTime = DateTime.fromISO(event.enddate.toISOString()).setZone('America/New_York').toFormat("ha")
            if (startDate > DateTime.local().setZone("America/New_York")) {
                const dateUntil = startDate.diff(DateTime.local().setZone('America/New_York')).toFormat("d 'Days' h 'Hours' m 'Minutes' s 'Seconds")
                allEvents.push(`${event.name} - ${startDate.toFormat("ccc L/d ha")}-${endTime} EST\n${dateUntil}\n`)
            }
            else {
                allEvents.push(`${event.name} - ${startDate.toFormat("ccc L/d ha")}-${endTime} EST\n`)
            }
        }
        if (allEvents.length < 1) return message.channel.send(embed.setDescription("There are no events scheduled. :sob:"))
        return message.channel.send(embed.setDescription(allEvents))
    }
}

module.exports = CountdownCommand;