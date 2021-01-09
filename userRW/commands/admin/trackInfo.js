const { Command } = require("discord-akairo");
const { db } = require("../../models/db");
const { editDistance } = require("../../utilities");

class TrackInfoCommand extends Command {
    constructor() {
        super("trackinfo", {
            aliases: ["trackinfo, tinfo"],
            category: "admin",
            ownerOnly: true,
            description: {
                content: "Shows information about a track.",
                usage: "trackinfo [song]",
                examples: [
                    "trackinfo evermore"
                ]
            },
            args: [
                {
                    id: "song",
                    type: "lowercase",
                    match: "content"
                }
            ]
        });
    }

    async exec(message, args) {
        const embed = this.client.util
            .embed()
            .setColor("GREEN")

        function fuzzySearch(title, callback){
            let result;
            let maxEditDist = 5;
            let minEditDist = maxEditDist;

            db.query("SELECT * FROM `music`", function(err, songList) {
                for(let i = 0; i < songList.length; i++){
                    editDistance(title, songList[i]['name'].toLowerCase(), function(tempDist){
                        if(tempDist < minEditDist && tempDist <= maxEditDist){
                            minEditDist = tempDist;
                            result = songList[i]
                        }
                    });
                }
                callback(result);
            });
        }

        fuzzySearch(args.song, function fetchSong(result) {
            if (result) {
                return message.channel.send(
                    embed
                        .setTitle("Track Information")
                        .setThumbnail(result.albumart)
                        .addFields(
                            {name: "Track Name", value: result.name, inline: true},
                            {name: "Album", value: result.album, inline: true},
                            {name: "Play Count", value: result.playcount, inline: true},
                            {name: "Path", value: result.path, inline: true},
                            {name: "Type", value: result.type, inline: true}
                        )
                )
            }
            if (!result) {
                return message.channel.send(
                    embed
                        .setDescription("I don't know this song.")
                        .setColor("RED")
                )
            }
        })


    }
}

module.exports = TrackInfoCommand