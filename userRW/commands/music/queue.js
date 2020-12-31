const { Command } = require("discord-akairo");
const fs = require("fs");
const mysql = require("mysql");
const config = require("../../config.json");
const database = require("../../models/database");
const { regularRestriction } = require("../../utilities");

const db = mysql.createPool({
	host: config.mySQL.host,
	user: config.mySQL.username,
	password: config.mySQL.password,
	database: config.mySQL.database,
    charset: "utf8mb4"
});

class QueueCommand extends Command {
    constructor() {
        super("queue", {
            aliases: ["queue", "q"],
            category: "music",
            channel: "guild",
            description: {
                content: "Adds a song to the music queue.",
                usage: "queue [song]",
                examples: [
                    "queue All Too Well"
                ]
            },
            args: [
                {
                    id: "song",
                    type: "string",
                    match: "content"
                }
            ]
        });
    }

    userPermissions(message) {
        return regularRestriction(message)
    }

    exec(message, args) {
        const queueEmbed = message.client.util
            .embed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: "png", dynamic: "true" }), message.author.displayAvatarURL({ format: "png", dynamic: "true" }))
            .setTitle("Song Queue")
            .setColor(message.member.displayHexColor)

        const failEmbed = message.client.util
            .embed()
            .setColor("RED")

        const successEmbed = message.client.util
            .embed()
            .setColor("GREEN")

        async function printQueue() {
            await database.queue.findAll()
                .then(async function (result) {
                    let songQueue = []
                    for (let i = 0; i < result.length; i++) {
                        await songQueue.push(`${i+1}. ${result[i].getDataValue("name")}`)
                    }
                    if (songQueue.length <= 0) return message.channel.send(queueEmbed.setDescription("There's nothing queued at the moment."))
                    return message.channel.send(queueEmbed.setDescription(songQueue))
                })
        }

        async function fetchSong() {
            
            let title = args.song;
            let user = message.author.username;
            
            console.log(`Title: ${title}`);
            fuzzySearch(title.toLowerCase(), async function(result){
                if(result){ //song found in db after fuzzy search
                    db.query("SELECT * FROM queue WHERE path LIKE ? ORDER BY path ASC", [result['path']], function(err, rows2){
                        //console.log(rows2);
                        if(rows2[0] != null){
                            const embed = new Discord.MessageEmbed()
                                .setColor(16711680) //red
                                .setDescription(`${result['name']} is already in the queue and was not added.`)
                            message.channel.send({embed});
                        }
                        else {
                            fs.access(`${config.discord.music_path}${result['path']}`, fs.F_OK, async (err) => {
                                if (err) {
                                    return message.channel.send(failEmbed.setDescription("I know this song but I couldn't find the file. :thinking:"))
                                }
                                db.query("INSERT INTO queue (name, path, queuedby) VALUES (?,?,?)", [result['name'], result['path'], user]);
                                const embed = new Discord.MessageEmbed()
                                    .setColor('#FF69B4') //pink
                                    .setDescription(`${result['name']} has been added to the queue.`)
                                message.channel.send({embed});
                                console.log(`Song: ${result['name']} Path: ${result['path']} Queued By: ${user}`);
                            })
                        }
                    })
                }else{
                    const embed = new Discord.MessageEmbed()
                        .setColor(16711680) //red
                        .setDescription(`That song could not be found.\nPlease check the track listings (!tracks).\nIf it's not there iandrewc to add the song.`);
                    message.channel.send({embed});
                }
            });
        }

        async function fuzzySearch(title, callback){
            let result;
            let maxEditDist = 5;
            let minEditDist = maxEditDist;
            db.query("SELECT path,name FROM music", function(err, songList) {
                let i;
                for(i = 0; i < songList.length; i++){
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

        async function editDistance(source, target, callback){
            let n = source.length + 1;
            let m = target.length + 1;
            let distMatrix = [];
            let min = 0;
            let i,j;
            for(i = 0; i < n; i++){
                distMatrix[i] = [];
            }
            for(i = 0; i < n; i++){
                distMatrix[i][0] = i;
            }
            for(i = 0; i < m; i++){
                distMatrix[0][i] = i;
            }
            for(i = 1; i < n; i++){
                for (j = 1; j < m; j++){
                    if(source.charAt(j-1) === target.charAt(i-1)){
                        min = distMatrix[i-1][j-1];
                    }else{
                        min = Math.min(distMatrix[i-1][j-1] + 1, distMatrix[i-1][j] + 1, distMatrix[i][j-1] + 1);

                    }
                    distMatrix[i][j] = min;
                }
            }
            callback(distMatrix[n-1][m-1]);
        }

        if (!args.song) {
            return printQueue()
        }
        else {
            return fetchSong()
        }
    }
}

module.exports = QueueCommand;