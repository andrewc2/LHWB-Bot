const Messages = {
  // Module-related
  MODULE_NOT_FOUND: (constructor: string, id: string) =>
    `${constructor} '${id}' does not exist`,
  ALREADY_LOADED: (constructor: string, id: string) =>
    `${constructor} '${id}' is already loaded`,
  INVALID_CLASS_TO_HANDLE: (given: string, expected: string) =>
    `Class to handle ${given} is not a subclass of ${expected}`,

  // Command-related
  NAME_CONFLICT: (name: string, id: string, conflict: string) =>
    `Name '${name}' of '${id}' already exists on '${conflict}'`,

  // Generic errors
  NOT_IMPLEMENTED: (constructor: string, method: string) =>
    `${constructor}#${method} has not been implemented`,
  INVALID_TYPE: (name: string, expected: string, vowel = false) =>
    `Value of '${name}' was not ${vowel ? 'an' : 'a'} ${expected}`,
};

interface MessageArgs {
  FILE_NOT_FOUND: [filename: string];
  MODULE_NOT_FOUND: [constructor: string, id: string];
  ALREADY_LOADED: [constructor: string, id: string];
  NOT_RELOADABLE: [constructor: string, id: string];
  INVALID_CLASS_TO_HANDLE: [given: string, expected: string];
  NAME_CONFLICT: [name: string, id: string, conflict: string];
  COMMAND_UTIL_EXPLICIT: [];
  UNKNOWN_MATCH_TYPE: [match: string];
  NOT_INSTANTIABLE: [constructor: string];
  NOT_IMPLEMENTED: [constructor: string, method: string];
  INVALID_TYPE: [name: string, expected: string, vowel: boolean];
}

export class FrameworkError<K extends keyof typeof Messages> extends Error {
  declare public code: string;

  public constructor(key: K, ...args: MessageArgs[K]) {
    if (Messages[key] == null)
      throw new TypeError(`Error key '${key}' does not exist`);
    const message =
      typeof Messages[key] === 'function'
        ? (Messages[key] as (...a: any[]) => any)(...args)
        : Messages[key];

    super(message);
    this.code = key;
  }

  public override get name() {
    return `Framework Error [${this.code}]`;
  }
}
