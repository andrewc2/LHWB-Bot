import Module from '../Module.js';

export default class Listener extends Module {

  constructor(id, options) {
    const { category, emitter, event, type = 'on' } = options;

    super(id, { category });
    this.emitter = emitter;
    this.event = event;
    this.type = type;
  }

  exec(...args) {}
}
