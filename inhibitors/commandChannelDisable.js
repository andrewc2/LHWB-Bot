const { Inhibitor } = require("discord-akairo");
const { db } = require("../models/db");

class CommandChannelDisabledInhibitor extends Inhibitor {
    constructor() {
        super("commandChannelDisabled", {
            reason: "Command Channel Disabled",
        });
    }

    async exec(message, command) {
        if (!message.guild) return;

        const guildID = message.guild.id;
        const channelID = message.channel.id;
        const commandID = command.id;

        const [rows] = await db.promise().query("SELECT * FROM `command` WHERE `guildID` = ? AND `channelID` = ? AND `commandID` = ?", [guildID, channelID, commandID]);
        if (rows.length > 0) return true;
    }
}

module.exports = CommandChannelDisabledInhibitor;