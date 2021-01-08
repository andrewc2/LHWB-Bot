const { Command } = require("discord-akairo");
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
            .setDescription("Song skipped. Finding a new song... :musical_note:")
            .setColor("GREEN")

        const current = await database.recent.findAll({ order: [["id", "DESC"]], limit: 1 })
        if (current[0].getDataValue("queuedby") !== null) await music.dequeue(current[0].getDataValue("name"));
        let result = await music.searchQueue() || await music.randomSong();
        await message.channel.send(embed);
        await music.autoPlay(result, this.client);

        /* db.query("SELECT id, name, queuedby FROM recent WHERE 1 ORDER BY id DESC", function(err, rows) {

            if (rows[0]['queuedby'] !== null){
                music.dequeue(rows[0]['name']);
            }
                
            let result = music.searchQueue() || music.randomSong();
            message.channel.send(embed);
            music.autoPlay(result, this.client);
        }); */
    }
}

module.exports = SkipCommand;