const { Command } = require("discord-akairo");
const { Op } = require("sequelize");
const { DateTime } = require('luxon');

const database = require("../../models/database");

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
        const embed = message.client.util
            .embed()
            .setTitle("Countdowns")
            .setURL("https://www.taylorswift.com/events")
            .setColor(16711680)

        let allEvents = []
        const events = await database.countdown.findAll({ order: [["startdate", "ASC"]], where: { enddate: { [Op.gt]: DateTime.local().setZone("America/New_York") }}})

        for (const event of events.values()) {
            const startDate = DateTime.fromISO(event.getDataValue("startdate").toISOString()).setZone('America/New_York')
            const endTime = DateTime.fromISO(event.getDataValue("enddate").toISOString()).setZone('America/New_York').toFormat("ha")
            if (startDate > DateTime.local().setZone("America/New_York")) {
                const dateUntil = startDate.diff(DateTime.local().setZone('America/New_York')).toFormat("d 'Days' h 'Hours' m 'Minutes' s 'Seconds")
                allEvents.push(`${event.getDataValue("name")} - ${startDate.toFormat("ccc L/d ha")}-${endTime} EST\n${dateUntil}`)
            }
            else {
                allEvents.push(`${event.getDataValue("name")} - ${startDate.toFormat("ccc L/d ha")}-${endTime} EST`)
            }
        }
        if (allEvents.length < 1) return message.channel.send(embed.setDescription("There are no events scheduled. :sob:"))
        return message.channel.send(embed.setDescription(allEvents))
    }
}

module.exports = CountdownCommand;