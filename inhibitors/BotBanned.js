import Inhibitor from '../structure/inhibitors/Inhibitor.js';

export default class BotBanned extends Inhibitor {
  constructor() {
    super('botBanned', {
      reason: 'botBanned',
    });
  }

  async exec(interaction) {
    return this.client.botBanned.has(interaction.user.id);
  }
}
