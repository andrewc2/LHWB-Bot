const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const lfmAPI = require("lastfmapi");

const lfm = new lfmAPI({
    api_key : config.lastfm.lfmAPIKey,
    secret  : config.lastfm.lfmAPISecret
});

function fetchFM(message, target) {
    lfm.user.getRecentTracks({
        limit : 2,
        user  : target
    }, function (err, recentTracks) {
        if (err) { console.log(err); }
        try {
            let nowPlaying = false;
            let status = "";
            try {
                if (recentTracks.track[0]["@attr"].nowplaying) {
                    nowPlaying = true;
                }
            } catch (undef) { // undefined
                //console.log(undef);
            }

            switch (nowPlaying) {
                case true:
                    status = "Current";
                    break;
                case false:
                    status = "Most Recent";
                    break;
            }
            const embed = new MessageEmbed()
                .setColor('#FF69B4')
                .setAuthor(target, `https://i.imgur.com/x5AhTlq.png`, `https://www.last.fm/user/${recentTracks["@attr"].user}`)
                .addField(`${status} Song`, `${recentTracks.track[0].name}`, true)
                .addField(`${status} Artist`, `${recentTracks.track[0].artist["#text"]}`, true)
                .addField('\u200b', '\u200b', true)
                .addField("Previous Song", `${recentTracks.track[1].name}`, true)
                .addField("Previous Artist", `${recentTracks.track[1].artist["#text"]}`, true)
                .addField('\u200b', '\u200b', true)
                .setThumbnail(`${recentTracks.track[0].image[3]["#text"]}`);
                if(nowPlaying) {
                    embed.setFooter(`Total Scrobbles: ${recentTracks["@attr"].total} - Currently Scrobbling`);
                } else {
                    embed.setFooter(`Total Scrobbles: ${recentTracks["@attr"].total} - Last scrobbled on: ${recentTracks.track[0].date["#text"]} (UTC)`);
                }
            message.channel.send({ embeds: [embed] });
            //console.log("Track 0: " + recentTracks.track[0].name);
            //console.log("Track 1: " + recentTracks.track[1].name);
            //console.log(`${recentTracks.track[0].image[3]["#text"]}`);
            
        } catch (unf) { // user not found
            //console.log(unf);              
            const embed = new MessageEmbed()
                .setColor('RED')
                .setDescription(`${target} is either not a last.fm user, has not scrobbled any songs yet, or the API is down, try again later if the user is definitely correct!`);

            message.channel.send({ embeds: [embed] });
        }
    });
}

module.exports = { fetchFM }