const { Listener } = require('discord-akairo');
const { Events, ActivityType } = require('discord.js');
const { logger } = require('../../utilities/winstonLogging');
const { autopostHandler } = require('../../utilities/taylorStoreAutoPoster');

module.exports = class ReadyListener extends Listener {
  constructor() {
    super('readyListener', {
      emitter: 'client',
      category: 'client',
      event: Events.ClientReady,
    });
  }

  async exec() {
    this.client.apiCommands = await this.client.application.commands.fetch();
    this.client.user.setActivity('Music', { type: ActivityType.Listening });
    setInterval(() => autopostHandler(this.client), 20000);
    logger.log('info', `Logged in as ${this.client.user.tag} (${this.client.user.id})`);
  }
};
