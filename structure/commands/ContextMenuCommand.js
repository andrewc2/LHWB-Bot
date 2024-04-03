import Module from '../Module.js';

export default class ContextMenuCommand extends Module {
  constructor(id, options) {
    const {
      guildOnly = false,
      category,
      name,
      ownerOnly = false,
      type,
    } = options;

    super(id, { category });
    this.guildOnly = Boolean(guildOnly);
    this.name = name;
    this.ownerOnly = Boolean(ownerOnly);
    this.type = type;
  }

  exec(interaction) {}
}
