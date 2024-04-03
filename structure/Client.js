import { Client as DiscordClient } from 'discord.js';

export default class extends DiscordClient {
  constructor(
    options,
    clientOptions,
  ) {
    const combinedOptions = { ...options, ...clientOptions };
    super(combinedOptions);
    this.ownerId = combinedOptions.ownerId ?? [];
  }

  isOwner(user) {
    const id = this.users.resolveId(user);
    if (!id) return false;
    return Array.isArray(this.ownerId)
      ? this.ownerId.includes(id)
      : id === this.ownerId;
  }
}
