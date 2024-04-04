import Command from '../../../structure/commands/Command.js';
import Utilities from '../../../utilities/Utilities.js';
import Paginator from '../../../utilities/Paginator.js';

export default class QueueShow extends Command {
  constructor() {
    super('queueShow', {
      name: 'queue show',
      category: 'music',
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'queue',
        shortName: 'show',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply({ fetchReply: true });
    const server = Utilities.getVoiceServer(this.client, interaction.guildId);

    const recent = (await server.getRecent(1))[0];
    const queue = await server.getQueue();

    const alreadyQueued = queue.length > 0 && recent['queued_by'] !== null && recent['official_name'] === queue[0]['official_name'];
    const songs = queue.map((song, i) => `${i + 1}. ${song['official_name']} - ${song['artist_name']}\n`);
    if (alreadyQueued) songs.shift();
    const description = songs.length === 0 ? 'There\'s nothing else queued at the moment...' : 'Queued for play:\n';

    const embedArray = Paginator.createEmbeds(
      queue.length === 0 ? [] : [description, ...songs],
      alreadyQueued ? `Currently Playing: ${recent['official_name']} (Queued)` : `Currently Playing: ${recent['official_name']}`,
      '#FF69B4',
      null,
      null,
      null,
      'https://lhwb.dev',
      10,
    );
    const paginator = new Paginator(interaction, embedArray, false, 'There\'s nothing queued at the moment...');
    return await paginator.send();
  }
}
