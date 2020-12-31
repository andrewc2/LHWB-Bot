const { Command } = require("discord-akairo");
const config = require("../../config.json")
const music = require("../../music");
const database = require("../../models/database");
const { cmdRestrictions } = require("../../utilities");

class SkipCommand extends Command {
    constructor() {
        super("skip", {
            aliases: ["skip"],
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
        const embed = message.client.util
            .embed()
            .setDescription("Song successfully skipped. Finding a new song... :musical_note:")
            .setColor("GREEN")

        let current = await database.recent.findOne({ order: [["id", "DESC"]], limit: 1 })
        await music.dequeue(current.getDataValue("name"));
        let result = await music.searchQueue() || await music.randomSong();
        await this.client.user.setActivity(result.song, { type: "LISTENING" })
        const dispatcher = message.client.voice.broadcasts[0].play(`${config.discord.music_path}${result.path}`, { bitrate: 192000 })
        await message.channel.send(embed)
        await music.updateRecent(result.song, result.queuedBy);
        dispatcher.on("finish", async () => {
            await music.updatePlayCount(result.song);
            await music.dequeue(result.song);
            result = await music.searchQueue() || await music.randomSong();
            await music.autoPlay(result, dispatcher.broadcast.client)
        })
    }
}

module.exports = SkipCommand;