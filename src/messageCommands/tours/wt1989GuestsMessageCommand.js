const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');

module.exports = class WT1989GuestsMessageCommand extends MessageCommand {
	constructor() {
		super('1989guests', {
			aliases: ['1989guests'],
			category: 'tours',
			description: {
				content: 'Displays the guest list on Taylor Swift\'s 1989 Tour.',
				usage: '1989guests',
				examples: [
					'1989guests',
				],
			},
		});
	}

	exec(message) {
		const failEmbed = new EmbedBuilder()
			.setColor(Colors.Red);

		const successEmbed = new EmbedBuilder()
			.setColor(568027)
			.setAuthor({
				name: '1989 World Tour: Secret Songs',
				iconURL: 'https://lhwb.dev/ts.png',
				url: 'https://en.wikipedia.org/wiki/The_1989_World_Tour#Shows',
			})
			.setThumbnail('https://i.imgur.com/tIO68fu.jpg');

		if (message.guild) {
			message.channel.send({ embeds: [successEmbed.setDescription('Due to the number of guests I\'ve DM\'d you the full list!')] });
		}
		message.author
			.send(
				{ embeds: [successEmbed
					.addFields([
						{ name: 'Leg 2 - North America', value: '5-15-15 (Las Vegas) Ed Sheeran - Tenerife Sea\n5-30-15 (Detroit) Dan Reynolds (Imagine Dragons) - Radioactive\n6-6-15 (Pittsburgh) Little Big Town - Pontoon\n6-12-15 (Philadelphia N1) Echosmith - Cool Kids\n6-13-15 (Philadelphia N2) Rachel Platten - Fight Song' },
						{ name: 'Leg 4a - North America', value: '7-10-15 (East Rutherford N1) The Weeknd - Can\'t Feel My Face\n7-11-15 (East Rutherford N2) Nick Jonas - Jealous\n7-13-15 (DC N1) Lorde - Royals\n7-14-15 (DC N2) Jason Derulo - Want to Want Me\n7-18-15 (Chicago N1) Andy Grammer - Honey, I\'m Good\n7-19-15 (Chicago N2) Sam Hunt - Steal My Show\n7-24-15 (Foxborough N1) Walk The Moon - Shut Up and Dance\n7-25-15 (Foxborough N2) MKTO - Classic\n8-1-15 (Vancouver) Nico & Vinz - Am I Wrong\n8-8-15 (Seattle) Shawn Mendes - Happy Birthday; Fetty Wap - Trap Queen\n8-14-15 (Santa Clara N1) Fifth Harmony - Worth It\n8-15-15 (Santa Clara N2) Little Mix (Black Magic\n8-22-15 (LA N1) Ryan Tedder - Counting Stars; Kobe Bryant - Most Sold Out Shows Banner\n8-23-15 (LA N2) Mary J Blige - Doubt / Family Affair\n8-24-15 (LA N3) Natalie Maines (Dixie Chicks) - Goodbye Earl; Alanis Morissette - You Oughta Know\n8-25-15 (LA N4) Beck w/ St. Vincent - Dreams; John Legend - All Of Me\n8-26-15 (LA N5) Selena Gomez - Good For You; Lisa Kudrow - Smelly Cat; Justin Timberlake - Mirrors' },
						{ name: 'Leg 4b - North America', value: '8-29-15 (San Diego) OMI - Cheerleader; Avril Lavigne - Complicated\n9-9-15 (Houston) Wiz Khalifa - See You Again\n9-16-15 (Indianapolis) The Band Perry - If I Die Young\n9-18-15 (Columbus N2) Echosmith - Cool Kids\n9-21-15 (Kansas City) Dierks Bentley - Every Mile a Memory\n9-25-15 (Nashville N1) Kelsea Ballerini - Love Me Like You Mean It; Steven Tyler - I Don\'t Want to Miss a Thing; Alison Krause - When You Say Nothing at All\n9-26-15 (Nashville N2) Leona Lewis - Bleeding Love; Mick Jagger - Satisfaction\n9-29-15 (St. Louis) Nelly - The Fix / Hot in Herre w/ HAIM\n10-2-15 (Toronto N1) Keith Urban - John Cougar, John Deere, John 3:16 / Somebody Like You\n10-3-15 (Toronto N2) Charli XCX - Boom Clap' },
					])
					.setFooter({ text: 'Only North America had special guests' })] })
			.catch(() => {
				message.channel.send({ embeds: [failEmbed.setDescription('It appears that I was unable to send the DM, possibly because you have your DM\'s disabled?')] });
			});
	}
};
