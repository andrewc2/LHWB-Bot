const { Listener } = require('discord-akairo');
const { Events, ActivityType } = require('discord.js');
const { logger } = require('../../utilities/winstonLogging');
const { UnitedKingdomStore, UnitedStatesStore, AustraliaStore, CanadaStore } = require('../../utilities/taylorStore');

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

    // Taylor Store Auto Poster
    setInterval(async () => await UnitedStatesStore(this.client).post(), 20000);
    setInterval(async () => await UnitedKingdomStore(this.client).post(), 20000);
    setInterval(async () => await AustraliaStore(this.client).post(), 20000);
    setInterval(async () => await CanadaStore(this.client).post(), 20000);

    logger.log('info', `Logged in as ${this.client.user.tag} (${this.client.user.id})`);
  }
};
