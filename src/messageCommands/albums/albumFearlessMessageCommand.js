const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');
const { pagination } = require('../../utilities/pagination');

module.exports = class AlbumFearlessMessageCommand extends MessageCommand {
	constructor() {
		super('fearless', {
			aliases: ['fearless'],
			category: 'albums',
			description: {
				content: 'Displays the track list for Taylor Swift\'s album Fearless.',
				usage: 'fearless',
				examples: [
					'fearless',
				],
			},
		});
	}

	async exec(message) {
		const embedTV = new EmbedBuilder()
			.setColor(14929032)
			.setAuthor({ name: 'Taylor Swift', iconURL: 'https://lhwb.dev/ts.png', url: 'https://en.wikipedia.org/wiki/Fearless_(Taylor_Swift_album)' })
			.setThumbnail('https://i.imgur.com/2lDT0PV.jpg')
			.setDescription('**Fearless** was released on __November 11, 2008__,\n**Fearless (Taylor\'s Version)** was released __April 9, 2021__\n\n1. Fearless (Taylor’s Version)\n2. Fifteen (Taylor’s Version)\n3. Love Story (Taylor’s Version)\n4. Hey Stephen (Taylor’s Version)\n5. White Horse (Taylor’s Version)\n6. You Belong With Me (Taylor’s Version)\n7. Breathe (feat. Colbie Caillat) (Taylor’s Version)\n8. Tell Me Why (Taylor’s Version)\n9. You\'re Not Sorry (Taylor’s Version)\n10. The Way I Loved You (Taylor’s Version)\n11. Forever and Always (Taylor’s Version)\n12. The Best Day (Taylor’s Version)\n13. Change (Taylor’s Version)\n14. Jump Then Fall (Taylor’s Version)\n15. Untouchable (Taylor’s Version)\n16. Forever And Always (Piano / Taylor’s Version)\n17. Come in with the Rain (Taylor’s Version)\n18. Superstar (Taylor’s Version)\n19. The Other Side of the Door (Taylor’s Version)\n20. Today Was A Fairytale (Taylor\'s Version)\n21. You All Over Me (feat. Maren Morris) (From The Vault)\n22. Mr. Perfectly Fine (From The Vault)\n23. We Were Happy (From The Vault)\n24. That\'s When (feat. Keith Urban) (From The Vault)\n25. Don\'t You (From The Vault)\n26. Bye Bye Baby (From The Vault)\n27. Love Story (Taylor\'s Version) - Elvira Remix');

		const embed = new EmbedBuilder()
			.setColor(14929032)
			.setAuthor({ name: 'Taylor Swift', iconURL: 'https://lhwb.dev/ts.png', url: 'https://en.wikipedia.org/wiki/Fearless_(Taylor_Swift_album)' })
			.setThumbnail('https://i.imgur.com/TPL7mge.jpg')
			.setDescription('**Fearless** was released on __November 11, 2008__ \n\n1. Fearless\n2. Fifteen\n3. Love Story\n4. Hey Stephen\n5. White Horse\n6. You Belong with Me\n7. Breathe (featuring Colbie Caillat)\n8. Tell Me Why\n9. You\'re Not Sorry\n10. The Way I Loved You\n11. Forever and Always\n12. The Best Day\n13. Change\n\n__Platinum Edition Tracks:__\nJump Then Fall\nUntouchable\nCome in with the Rain\nSuperstar\nThe Other Side of the Door\nForever And Always (Piano Version)');

		const embedArray = [embedTV, embed];
		await pagination(message, embedArray);
	}
};
