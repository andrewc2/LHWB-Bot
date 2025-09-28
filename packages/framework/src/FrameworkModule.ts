import type { Category } from './Category.js';
import type { FrameworkClient } from './FrameworkClient.js';
import type { FrameworkHandler } from './FrameworkHandler.js';

export abstract class FrameworkModule<
  Handler extends FrameworkHandler<Module, Handler>,
  Module extends FrameworkModule<Handler, Module>,
> {
  public category: Category<string, this>;
  public categoryID: string;
  public client: FrameworkClient;
  public filepath: string;
  public handler: Handler;
  public id: string;

  /**
   * @param id The ID of module.
   * @param options Additional options for this module.
   */
  protected constructor(id: string, options?: ModuleOptions) {
    const { category = 'default' } = options ?? {};

    this.id = id;
    this.categoryID = category;
    this.category = null!;
    this.filepath = null!;
    this.client = null!;
    this.handler = null!;
  }

  public toString(): string {
    return this.id;
  }
}

export interface ModuleOptions {
  category?: string;
}
