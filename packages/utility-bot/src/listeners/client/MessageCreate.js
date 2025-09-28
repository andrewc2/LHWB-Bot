import { Listener } from '@lhwb/framework';
import { Events } from 'discord.js';

export default class MessageCreate extends Listener {
  constructor() {
    super('messageCreate', {
      emitter: 'client',
      category: 'client',
      event: Events.MessageCreate,
    });
  }

  async exec(message) {
    await this.client.database.query(
      'INSERT IGNORE INTO user (`userID`) VALUES (?)',
      [message.author.id],
    );
  }
}
