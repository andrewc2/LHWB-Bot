import { Collection } from 'discord.js';

export default class Category extends Collection {
  constructor(id, iterable) {
    super(iterable);
    this.id = id;
  }

  toString() {
    return this.id;
  }
}
