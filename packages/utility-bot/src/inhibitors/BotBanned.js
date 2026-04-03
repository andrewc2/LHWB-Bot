import { Inhibitor } from '@lhwb/framework';

export default class BotBanned extends Inhibitor {
  constructor() {
    super('botBanned', {
      reason: 'botBanned',
    });
  }

  /**
   * @param {import('discord.js').Interaction} interaction
   */
  async exec(interaction) {
    return await this.client.cache.botBanned.isBanned(interaction.user.id);
  }
}
