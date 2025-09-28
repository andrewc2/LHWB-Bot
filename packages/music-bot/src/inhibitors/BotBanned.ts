import { Inhibitor } from '@lhwb/framework';
import { ChatInputCommandInteraction } from 'discord.js';

export default class BotBanned extends Inhibitor {
  constructor() {
    super('botBanned', {
      reason: 'botBanned',
    });
  }

  async exec(interaction: ChatInputCommandInteraction) {
    return await this.client.cache.botBanned.isBanned(interaction.user.id);
  }
}
