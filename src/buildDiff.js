import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';
import process from 'process';
import parse from './parsers.js';
import formatter from './formatters/index.js';

const getAbsolutPath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath) => readFileSync(getAbsolutPath(filepath), 'utf-8');

const getDiff = (obj1, obj2) => {
  const key1 = Object.keys(obj1);
  const key2 = Object.keys(obj2);

  const uniqKeys = _.union(key1, key2);
  const sortedKeys = _.sortBy(uniqKeys);

  return sortedKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return { name: key, newValue: obj2[key], status: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { name: key, oldValue: obj1[key], status: 'removed' };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        name: key,
        children: getDiff(obj1[key], obj2[key]),
        status: 'nested',
      };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        name: key,
        oldValue: obj1[key],
        newValue: obj2[key],
        status: 'updated',
      };
    }
    return {
      name: key,
      oldValue: obj1[key],
      newValue: obj2[key],
      status: 'unchanged',
    };
  });
};

const buildDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const obj1 = parse(data1, path.extname(filepath1));
  const obj2 = parse(data2, path.extname(filepath2));
  const diff = getDiff(obj1, obj2);
  const formatDiff = formatter(diff, formatName);
  return formatDiff;
};

export default buildDiff;
