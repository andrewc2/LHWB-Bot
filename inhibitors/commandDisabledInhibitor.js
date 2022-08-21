const { Inhibitor } = require('discord-akairo');

module.exports = class CommandDisabledInhibitor extends Inhibitor {
  constructor() {
    super('commandDisabled', {
      reason: 'commandDisabledGlobally',
    });
  }

  async exec(message, command) {
    const commandID = command.prefixId ?? command.id;
    return this.client.globalCommandDisable.has(commandID);
  }
};
