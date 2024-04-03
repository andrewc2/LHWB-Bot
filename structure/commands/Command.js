import Module from '../Module.js';

export default class Command extends Module {
  constructor(id, commandOptions) {
    super(id, { category: commandOptions?.category });

    const {
      guildOnly = false,
      clientPermissions = this.clientPermissions,
      description,
      usage = null,
      example = null,
      guarded = false,
      hidden = false,
      name,
      ownerOnly = false,
      options = [],
      userPermissions = this.userPermissions,
      deploymentDetails = this.deploymentDetails,
    } = commandOptions ?? {};

    this.guildOnly = guildOnly;
    this.clientPermissions = clientPermissions;
    this.description = description;
    this.usage = usage;
    this.example = example;
    this.guarded = Boolean(guarded);
    this.hidden = Boolean(hidden);
    this.name = name;
    this.ownerOnly = Boolean(ownerOnly);
    this.options = options;
    this.userPermissions =
        typeof userPermissions === 'function'
            ? userPermissions.bind(this)
            : userPermissions;
    this.deploymentDetails = deploymentDetails;
  }

  exec(interaction) {}
  autocomplete(interaction) {}
}
