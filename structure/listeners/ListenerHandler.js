import { Collection } from 'discord.js';
import Listener from './Listener.js';
import Handler from '../Handler.js';
import StructureError from '../utilities/StructureError.js';

export default class ListenerHandler extends Handler {

  constructor(client, options) {
    const {
      directory,
      classToHandle = Listener,
      extensions = ['.js', '.ts'],
      automateCategories,
      loadFilter,
    } = options ?? {};

    if (classToHandle !== Listener) {
      throw new StructureError(
        'INVALID_CLASS_TO_HANDLE',
        classToHandle.name,
        Listener.name,
      );
    }

    super(client, {
      directory,
      classToHandle,
      extensions,
      automateCategories,
      loadFilter,
    });

    this.emitters = new Collection();
    this.emitters.set('client', this.client);
  }

  addToEmitter(id) {
    const listener = this.modules.get(id.toString());
    if (!listener) {
      throw new StructureError(
        'MODULE_NOT_FOUND',
        this.classToHandle.name,
        id,
      );
    }

    const emitter = this.isEventEmitter(listener.emitter)
      ? (listener.emitter)
      : this.emitters.get(listener.emitter);
    if (!this.isEventEmitter(emitter)) {
      throw new StructureError(
        'INVALID_TYPE',
        'emitter',
        'EventEmitter',
        true,
      );
    }

    emitter[listener.type ?? 'on'](listener.event, listener.exec);
    return listener;
  }

  register(listener, filepath) {
    super.register(listener, filepath);
    listener.exec = listener.exec.bind(listener);
    this.addToEmitter(listener.id);
  }

  removeFromEmitter(id) {
    const listener = this.modules.get(id.toString());
    if (!listener) {
      throw new StructureError(
        'MODULE_NOT_FOUND',
        this.classToHandle.name,
        id,
      );
    }

    const emitter = this.isEventEmitter(listener.emitter)
      ? (listener.emitter)
      : this.emitters.get(listener.emitter);
    if (!this.isEventEmitter(emitter)) {
      throw new StructureError(
        'INVALID_TYPE',
        'emitter',
        'EventEmitter',
        true,
      );
    }

    emitter.removeListener(listener.event, listener.exec);
    return listener;
  }

  setEmitters(emitters) {
    for (const [key, value] of Object.entries(emitters)) {
      if (!this.isEventEmitter(value)) {
        throw new StructureError(
          'INVALID_TYPE',
          key,
          'EventEmitter',
          true,
        );
      }
      this.emitters.set(key, value);
    }

    return this;
  }

  isEventEmitter(value) {
    return (
      value &&
            typeof value.on === 'function' &&
            typeof value.emit === 'function'
    );
  }
}
