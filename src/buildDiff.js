import _ from "lodash";
import { readFileSync } from "fs";
import path from "path";
import process from "process";
import parse from "./parsers.js";
import formatter from "./formatters/formatter.js";

const getAbsolutPath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath) => readFileSync(getAbsolutPath(filepath), "utf-8");

// const getFormat = (filename) => filename.split(".")[1];

const getDiff = (obj1, obj2) => {
  const result = [];

  for (const key in obj1) {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      const diff = getDiff(value1, value2);
      result.push({ key, value: diff, status: 0 });
    } else if (value1 === value2) {
      result.push({ key, value: value1, status: 0 });
    } else {
      result.push({ key, value: value1, status: -1 });
    }
  }

  for (const key in obj2) {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isObject(value1) && _.isObject(value2)) continue;

    if (value2 !== value1) {
      result.push({ key, value: value2, status: 1 });
    }
  }

  const sortResult = _.sortBy(result, ["key", "status"]);
  return sortResult;
};

const buildDiff = (filepath1, filepath2, formatName = "stylish") => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const obj1 = parse(data1, path.extname(filepath1));
  const obj2 = parse(data2, path.extname(filepath2));
  const diff = getDiff(obj1, obj2);
  const formatDiff = formatter(diff, formatName);
  return formatDiff;
};

export default buildDiff;
