const { Command } = require("discord-akairo");
const { getVoiceConnection } = require('@discordjs/voice');
const music = require("../../music");
const { db } = require("../../models/db");
const { cmdRestrictions } = require("../../utilities");

class SkipCommand extends Command {
    constructor() {
        super("skip", {
            aliases: ["skip", "lskip"],
            category: "music",
            channel: "guild",
            cooldown: 3000,
            ratelimit: 1,
            description: {
                content: "Skips the current song.",
                usage: "skip",
                examples: [
                    "skip"
                ]
            }
        });
    }

    userPermissions(message) {
        return cmdRestrictions(message)
    }

    async exec(message, args) {
        const connection = getVoiceConnection(message.guild.id);
        const embed = message.client.util.embed()
            .setDescription("Song skipped. Finding a new song... :musical_note:")
            .setColor("GREEN")

        const [rows] = await db.promise().query("SELECT id, name, queuedby FROM recent WHERE 1 ORDER BY id DESC")
        if (rows[0]['queuedby'] !== null) music.dequeue(rows[0]['name']);
        await message.channel.send({ embeds: [embed] });
        setTimeout(async function () { music.autoPlay(await music.searchQueue() || await music.randomSong(), connection, message.client) }, 500)
    }
}

module.exports = SkipCommand;