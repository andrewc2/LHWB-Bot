export const ArgumentTypes = Object.freeze({
  INHIBITOR: 'inhibitor',
} as const);

export const HandlerEvents = Object.freeze({
  LOAD: 'load',
  REMOVE: 'remove',
} as const);

export const CommandHandlerEvents = Object.freeze({
  COMMAND_BLOCKED: 'commandBlocked',
  COMMAND_FINISHED: 'commandFinished',
  COMMAND_LOCKED: 'commandLocked',
  COMMAND_STARTED: 'commandStarted',
  COMMAND_NOT_FOUND: 'commandNotFound',
  ERROR: 'error',
  INTERACTION_BLOCKED: 'interactionBlocked',
  MISSING_PERMISSIONS: 'missingPermissions',
} as const);

Object.freeze({
  ERROR: 'error',
  FINISHED: 'finished',
  NOT_FOUND: 'notFound',
  STARTED: 'started',
  BLOCKED: 'blocked',
} as const);

export const BuiltInReasons = Object.freeze({
  CLIENT: 'client',
  BOT: 'bot',
  OWNER: 'owner',
  GUILD: 'guild',
  DM: 'dm',
  AUTHOR_NOT_FOUND: 'authorNotFound',
  NOT_NSFW: 'notNsfw',
} as const);
