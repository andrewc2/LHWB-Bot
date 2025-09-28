import { readFile } from 'fs';
import { join, parse, sep } from 'path';
import { promisify } from 'util';

import { glob } from 'glob';
import pkg from 'lodash';
const { set } = pkg;

const asyncReadFile = promisify(readFile);
const asyncMap = (arr, callback) =>
  Promise.all(arr.map((...args) => callback(...args)));

const parseFile = async (filePath, parser = JSON.parse) => {
  const buff = await asyncReadFile(filePath);
  const text = buff.toString();
  try {
    return parser(text);
  } catch (parseError) {
    throw new Error(`Failed to parse ${filePath}. Error: ${parseError}`);
  }
};

const getKey = (path) => {
  const parts = path.split(sep);
  if (parts.length) {
    const fileName = parts[parts.length - 1];
    parts[parts.length - 1] = parse(fileName).name;
  }
  return parts;
};

const processMatch = async (result, root, filePath, parser) => {
  const fullPath = join(root, filePath);
  const what = await parseFile(fullPath, parser);
  const where = getKey(filePath);
  set(result, where, what);
  return result;
};

export const combine = async (root, options = {}) => {
  const { parser, include = '*.json', exclude } = options;
  const matches = await glob(include, {
    // glob options: https://www.npmjs.com/package/glob#options
    ignore: exclude,
    cwd: root,
    mark: true,
    nocase: true,
    nodir: true,
    matchBase: true,
  });
  const result = {};
  await asyncMap(matches, (filePath) =>
    processMatch(result, root, filePath, parser),
  );

  return result;
};
