const { Listener } = require('discord-akairo');
const { Events, ActivityType } = require('discord.js');
const { TimerBasedCronScheduler, parseCronExpression } = require('cron-schedule');
const { logger } = require('../../utilities/winstonLogging');
const { fastFetchStore, slowFetchStore, enableStores } = require('../../utilities/utilities');

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

    const stores = this.client.stores;
    stores.forEach((store) => store.cache());
    setInterval(() => fastFetchStore(stores), 10000);
    setInterval(() => slowFetchStore(stores), 30000);

    TimerBasedCronScheduler.setInterval(
      parseCronExpression('*/30 * * * *'),
      () => this.client.cart.clear(),
    );

    TimerBasedCronScheduler.setInterval(parseCronExpression('*/2 * * * *'), () =>
      enableStores(stores),
    );

    logger.log('info', `Logged in as ${this.client.user.tag} (${this.client.user.id})`);
  }
};
