import { existsSync } from 'fs';
import fs from 'fs/promises';
import { dirname, resolve, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getProjectRoot = (currentDir = __dirname) => {
  let dir = currentDir;
  let lastDirWithPkg = null;

  while (true) {
    if (existsSync(resolve(dir, 'package.json'))) {
      lastDirWithPkg = dir;
    }
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }

  return lastDirWithPkg ?? currentDir;
};

export const loadJSON = async (file) => {
  const rootDir = getProjectRoot();

  const filePath = join(rootDir, file);
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
};
