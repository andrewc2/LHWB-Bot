import StructureError from '../utilities/StructureError.js';
import Module from '../Module.js';

export default class Inhibitor extends Module {
  constructor(id, options) {
  const {
  category,
  reason = '',
  type = 'post',
  priority = 0,
} = options ?? {};

super(id, { category });

this.reason = reason;
this.type = type;
this.priority = priority;
}

exec(
    interaction,
    command,
) {};
exec(
    interaction,
    command,
) {};
exec(
    interaction,
    command,
) {
  throw new StructureError(
      'NOT_IMPLEMENTED',
      this.constructor.name,
      'exec',
  );
}
}
