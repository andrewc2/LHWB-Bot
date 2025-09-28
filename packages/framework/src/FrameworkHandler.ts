import { createRequire } from 'module';
import EventEmitter from 'node:events';
import { readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

import { Collection } from 'discord.js';

import { Category } from './Category.js';
import { FrameworkClient } from './FrameworkClient.js';
import { FrameworkModule } from './FrameworkModule.js';
import { HandlerEvents } from './utilities/constants.js';
import { FrameworkError } from './utilities/FrameworkError.js';

export type Class<T> = abstract new (...args: any[]) => T;

const require = createRequire(import.meta.url);

export class FrameworkHandler<
  Module extends FrameworkModule<Handler, Module>,
  Handler extends FrameworkHandler<Module, Handler>,
> extends EventEmitter {
  public automateCategories: boolean;
  public categories: Collection<string, Category<string, Module>>;
  public classToHandle: Class<Module>;
  public client: FrameworkClient;
  public directory: string;
  public extensions: Set<Extension>;
  public loadFilter: LoadPredicate;
  public modules: Collection<string, Module>;

  public constructor(
    client: FrameworkClient,
    options: FrameworkHandlerOptions<Module, Handler>,
  ) {
    const {
      directory,
      classToHandle = FrameworkModule,
      extensions = ['.js', '.ts', '.json'],
      automateCategories = false,
      loadFilter = () => true,
    } = options ?? {};
    super();

    this.client = client;
    this.directory = directory;
    this.classToHandle = <Class<Module>>classToHandle;
    this.extensions = new Set(extensions);
    this.automateCategories = Boolean(automateCategories);
    this.loadFilter = loadFilter;
    this.modules = new Collection();
    this.categories = new Collection();
  }

  public findCategory(name: string): Category<string, Module> | undefined {
    return this.categories.find((category) => {
      return category.id.toLowerCase() === name.toLowerCase();
    });
  }

  public async load(
    thing: string | Module,
    isReload = false,
  ): Promise<Module | undefined> {
    const isClass = typeof thing === 'function';
    if (!isClass && !this.extensions.has(extname(thing as string) as Extension))
      return undefined;

    let mod = isClass
      ? thing
      : function findExport(
          this: FrameworkHandler<Module, Handler>,
          m: any,
        ): any {
          if (!m) return null;
          if (m.prototype instanceof this.classToHandle) return m;
          return m.default ? findExport.call(this, m.default) : null;
        }.call(
          this,
          await eval(
            `import(${JSON.stringify(`${pathToFileURL(thing as string).toString()}?update=${Date.now()}`)})`,
          ),
        );

    if (mod && mod.prototype instanceof this.classToHandle) {
      mod = new mod(this);
    } else {
      if (!isClass) delete require.cache[require.resolve(thing as string)];
      return undefined;
    }

    if (this.modules.has(mod.id))
      throw new FrameworkError(
        'ALREADY_LOADED',
        this.classToHandle.name,
        mod.id,
      );
    this.register(mod, isClass ? null! : (thing as string));
    this.emit(HandlerEvents.LOAD, mod, isReload);
    return mod;
  }

  public async loadAll(
    directory: string = this.directory!,
    filter: LoadPredicate = this.loadFilter || (() => true),
  ): Promise<this> {
    const filepaths = FrameworkHandler.readdirRecursive(directory);
    const promises = [];
    for (let filepath of filepaths) {
      filepath = resolve(filepath);
      if (filter(filepath)) promises.push(this.load(filepath));
    }

    await Promise.all(promises);
    return this;
  }

  public register(mod: Module, filepath?: string): void {
    mod.filepath = filepath!;
    mod.client = this.client;
    mod.handler = <Handler>(<unknown>this);
    this.modules.set(mod.id, mod);

    if (mod.categoryID === 'default' && this.automateCategories) {
      const dirs = dirname(filepath!).split(sep);
      mod.categoryID = dirs[dirs.length - 1];
    }

    if (!this.categories.has(mod.categoryID)) {
      this.categories.set(mod.categoryID, new Category(mod.categoryID));
    }

    const category = this.categories.get(mod.categoryID)!;
    mod.category = category;
    category.set(mod.id, mod);
  }

  public static readdirRecursive(directory: string): string[] {
    const result = [];

    (function read(dir) {
      const files = readdirSync(dir);

      for (const file of files) {
        const filepath = join(dir, file);

        if (statSync(filepath).isDirectory()) {
          read(filepath);
        } else {
          result.push(filepath);
        }
      }
    })(directory);

    return result;
  }
}

export type LoadPredicate = (filepath: string) => boolean;

export interface FrameworkHandlerOptions<
  Module extends FrameworkModule<Handler, Module>,
  Handler extends FrameworkHandler<Module, Handler>,
> {
  automateCategories?: boolean;
  classToHandle?: Class<Module>;
  directory: string;
  extensions?: Extension[] | Set<Extension>;
  loadFilter?: LoadPredicate;
}

export type Extension = `.${string}`;
