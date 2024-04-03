import EventEmitter from 'events';
import fs from 'fs';
import path from 'path';
import url from 'url';
import { createRequire } from 'module';
import { Collection } from 'discord.js';
import Module from './Module.js';
import Category from './Category.js';
import { HandlerEvents } from './utilities/constants.js';
import StructureError from './utilities/StructureError.js';

const require = createRequire(import.meta.url);

export default class Handler extends EventEmitter {
  constructor(client, options) {
    const {
      directory,
      classToHandle = Module,
      extensions = ['.js', '.ts', '.json'],
      automateCategories = false,
      loadFilter = () => true,
    } = options ?? {};
    super();

    this.client = client;
    this.directory = directory;
    this.classToHandle = classToHandle;
    this.extensions = new Set(extensions);
    this.automateCategories = Boolean(automateCategories);
    this.loadFilter = loadFilter;
    this.modules = new Collection();
    this.categories = new Collection();
  }

  findCategory(name) {
    return this.categories.find((category) => {
      return category.id.toLowerCase() === name.toLowerCase();
    });
  }

  async load(thing, isReload = false) {
    const isClass = typeof thing === 'function';
    if (!isClass && !this.extensions.has(path.extname(thing))) {return undefined;}

    let mod = isClass
      ? thing
      : function findExport(m) {
        if (!m) return null;
        if (m.prototype instanceof this.classToHandle) return m;
        return m.default ? findExport.call(this, m.default) : null;
      }.call(
        this,
        await eval(
          `import(${JSON.stringify(
            url.pathToFileURL(thing).toString(),
          )})`,
        ),
      );

    if (mod && mod.prototype instanceof this.classToHandle) {
      mod = new mod(this);
    }
    else {
      if (!isClass) {delete require.cache[require.resolve(thing)];}
      return undefined;
    }

    if (this.modules.has(mod.id)) {
      throw new StructureError(
        'ALREADY_LOADED',
        this.classToHandle.name,
        mod.id,
      );
    }
    this.register(mod, isClass ? null : thing);
    this.emit(HandlerEvents.LOAD, mod, isReload);
    return mod;
  }

  async loadAll(
    directory = this.directory,
    filter = this.loadFilter || (() => true),
  ) {
    const filepaths = Handler.readdirRecursive(directory);

    const promises = [];
    for (let filepath of filepaths) {
      filepath = path.resolve(filepath);
      if (filter(filepath)) promises.push(this.load(filepath));
    }

    await Promise.all(promises);
    return this;
  }

  register(mod, filepath) {
    mod.filepath = filepath;
    mod.client = this.client;
    mod.handler = this;
    this.modules.set(mod.id, mod);

    if (mod.categoryID === 'default' && this.automateCategories) {
      const dirs = path.dirname(filepath).split(path.sep);
      mod.categoryID = dirs[dirs.length - 1];
    }

    if (!this.categories.has(mod.categoryID)) {
      this.categories.set(mod.categoryID, new Category(mod.categoryID));
    }

    const category = this.categories.get(mod.categoryID);
    mod.category = category;
    category.set(mod.id, mod);
  }

  static readdirRecursive(directory) {
    const result = [];
    (function read(dir) {
      const files = fs.readdirSync(dir);

      for (const file of files) {
        const filepath = path.join(dir, file);

        if (fs.statSync(filepath).isDirectory()) {
          read(filepath);
        }
        else {
          result.push(filepath);
        }
      }
    })(directory);
    return result;
  }
}
