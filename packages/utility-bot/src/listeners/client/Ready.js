import { Listener } from '@lhwb/framework';
import { Events } from 'discord.js';

export default class Ready extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      category: 'client',
      event: Events.ClientReady,
    });
  }

  async exec() {
    this.client.apiCommands = await this.client.application.commands.fetch();
    this.client.logger.info(`@lhwb/utility-bot has logged in`);
  }
}
