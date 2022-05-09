const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const lfmAPI = require("lastfmapi");
const { logger } = require("../../utilities/logging");

const lfm = new lfmAPI({
	api_key : config.lastfm.lfmAPIKey,
	secret  : config.lastfm.lfmAPISecret,
});

function fetchFM(message, target) {
	lfm.user.getRecentTracks({ limit: 2, user: target }, function(err, recentTracks) {

		if (err) {
			logger.log("error", err);
			const errorMsg = err.message === "Cannot read property '@attr' of undefined" ? "This user has no scrobbles" : err.message;
			return message.channel.send({ embeds: [
				new MessageEmbed()
					.setDescription(`Last.fm returned the following error: \`${errorMsg}\``)
					.setColor("RED"),
			] });
		}

		const status = recentTracks.track[0]["@attr"] ? "Now Playing" : "Most Recent";
		const nowPlaying = recentTracks.track[0]["@attr"] ? "Currently Scrobbling" : `Last scrobbled on: ${recentTracks.track[0].date["#text"]} (UTC)`;

		const embed = new MessageEmbed()
			.setColor("#FF69B4")
			.setAuthor({
				name: target,
				iconUrl: "https://i.imgur.com/x5AhTlq.png",
				url: `https://www.last.fm/user/${recentTracks["@attr"].user}`
			})
			.addField(`${status} Song`, `${recentTracks.track[0].name}`, true)
			.addField(`${status} Artist`, `${recentTracks.track[0].artist["#text"]}`, true)
			.addField("\u200b", "\u200b", true)
			.addField("Previous Song", `${recentTracks.track[1].name}`, true)
			.addField("Previous Artist", `${recentTracks.track[1].artist["#text"]}`, true)
			.addField("\u200b", "\u200b", true)
			.setThumbnail(`${recentTracks.track[0].image[3]["#text"]}`)
			.setFooter({ text: `Total Scrobbles: ${recentTracks["@attr"].total} - ${nowPlaying}` });

		// console.log("Track 0: " + recentTracks.track[0].name);
		// console.log("Track 1: " + recentTracks.track[1].name);
		// console.log(`${recentTracks.track[0].image[3]["#text"]}`);

		return message.channel.send({ embeds: [embed] });
	});
}

module.exports = { fetchFM };
