import { Collection } from 'discord.js';

import type { FrameworkModule } from './FrameworkModule.js';

export class Category<
  K extends string,
  V extends FrameworkModule<any, any>,
> extends Collection<K, V> {
  public id: string;

  public constructor(id: string, iterable?: Iterable<readonly [K, V]>) {
    super(iterable);
    this.id = id;
  }

  public override toString(): string {
    return this.id;
  }
}
