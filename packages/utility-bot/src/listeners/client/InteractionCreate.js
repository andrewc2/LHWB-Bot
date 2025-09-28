import { Listener } from '@lhwb/framework';
import { Events } from 'discord.js';

export default class InteractionCreate extends Listener {
  constructor() {
    super('interactionCreate', {
      emitter: 'client',
      category: 'client',
      event: Events.InteractionCreate,
    });
  }

  async exec(interaction) {
    await this.client.database.query(
      'INSERT IGNORE INTO user (`userID`) VALUES (?)',
      [interaction.user.id],
    );
  }
}
