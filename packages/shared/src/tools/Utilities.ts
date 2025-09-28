import { existsSync } from 'fs';
import fs from 'fs/promises';
import { dirname, resolve, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class Utilities {
  static async doesFileExist(filepath: string): Promise<boolean> {
    try {
      await fs.access(filepath, fs.constants.F_OK);
      return true;
    } catch {
      return false;
    }
  }

  static getProjectRoot = (currentDir = __dirname) => {
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

  static isJSON(string: string): boolean {
    let isJSON = true;
    try {
      JSON.parse(string);
    } catch {
      isJSON = false;
    }
    return isJSON;
  }

  static async loadJSON(file: string) {
    const rootDir = Utilities.getProjectRoot();

    const filePath = join(rootDir, file);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  }
}
