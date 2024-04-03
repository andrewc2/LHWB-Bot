import StructureError from '../utilities/StructureError.js';
import Handler from '../Handler.js';
import Inhibitor from './Inhibitor.js';

export default class InhibitorHandler extends Handler {
  constructor(client, options) {
    const {
      directory,
      classToHandle = Inhibitor,
      extensions = ['.js', '.ts'],
      automateCategories,
      loadFilter,
    } = options ?? {};

    if (classToHandle !== Inhibitor) {
      throw new StructureError(
          'INVALID_CLASS_TO_HANDLE',
          classToHandle.name,
          Inhibitor.name,
      );
    }

    super(client, {
      directory,
      classToHandle,
      extensions,
      automateCategories,
      loadFilter,
    });
  }

async test(
      type,
      interaction,
      command,
) {
  if (!this.modules.size) return null;

  const inhibitors = this.modules.filter((i) => i.type === type);
  if (!inhibitors.size) return null;

  const promises = [];

  for (const inhibitor of inhibitors.values()) {
  promises.push(
(async () => {
  let inhibited = inhibitor.exec(interaction, command);
  if (this.isPromise(inhibited)) inhibited = await inhibited;
  if (inhibited) return inhibitor;
  return null;
})(),
);
}

const inhibitedInhibitors = (await Promise.all(promises)).filter(
    (r) => r,
);
if (!inhibitedInhibitors.length) return null;

inhibitedInhibitors.sort((a, b) => b.priority - a.priority);
return inhibitedInhibitors[0].reason;
}

isPromise(value) {
  return (
      value &&
typeof value.then === 'function' &&
typeof value.catch === 'function'
);
}
}
