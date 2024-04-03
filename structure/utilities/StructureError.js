const Messages = {
  // Module-related
  MODULE_NOT_FOUND: (constructor, id) =>
    `${constructor} '${id}' does not exist`,
  ALREADY_LOADED: (constructor, id) =>
    `${constructor} '${id}' is already loaded`,
  INVALID_CLASS_TO_HANDLE: (given, expected) =>
    `Class to handle ${given} is not a subclass of ${expected}`,

  // Command-related
  NAME_CONFLICT: (name, id, conflict) =>
    `Name '${name}' of '${id}' already exists on '${conflict}'`,

  // Generic errors
  NOT_IMPLEMENTED: (constructor, method) =>
    `${constructor}#${method} has not been implemented`,
  INVALID_TYPE: (name, expected, vowel = false) =>
    `Value of '${name}' was not ${vowel ? 'an' : 'a'} ${expected}`,
};

export default class StructureError extends Error {
  constructor(key, ...args) {
    if (Messages[key] == null) {throw new TypeError(`Error key '${key}' does not exist`);}
    const message =
            typeof Messages[key] === 'function'
              ? (Messages[key])(...args)
              : Messages[key];

    super(message);
    this.code = key;
  }

  get name() {
    return `Structure Error [${this.code}]`;
  }
}
