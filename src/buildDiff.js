import _ from "lodash";
import { readFileSync } from "fs";
import path from "path";
import process from "process";

const getAbsolutPath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath) => readFileSync(getAbsolutPath(filepath), "utf-8");

// const getFormat = (filename) => filename.split(".")[1];

const getDiff = (obj1, obj2) => {
  const result = [];

  for (const key in obj1) {
    if (obj1[key] === obj2[key]) {
      result.push({ key, value: obj1[key], status: 0 });
    } else result.push({ key, value: obj1[key], status: -1 });
  }
  for (const key in obj2) {
    if (obj2[key] !== obj1[key]) {
      result.push({ key, value: obj2[key], status: 1 });
    }
  }

  const sortResult = _.sortBy(result, ["key", "status"]);
  return sortResult;
};

const format = (diff) => {
  let result = "{\n";
  let stringResult;
  for (const element of diff) {
    let character;
    if (element.status === 1) {
      character = "+";
    }
    if (element.status === 0) {
      character = " ";
    }
    if (element.status === -1) {
      character = "-";
    }
    stringResult = `  ${character} ${element.key}: ${element.value}\n`;
    result = result + stringResult;
  }
  result = `${result}}`;
  return result;
};

const buildDiff = (filepath1, filepath2) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const obj1 = JSON.parse(data1);
  const obj2 = JSON.parse(data2);
  const diff = getDiff(obj1, obj2);
  const formatDiff = format(diff);
  return formatDiff;
};

export default buildDiff;

// console.log(
//   format([
//     { key: "follow", value: false, status: -1 },
//     { key: "host", value: "hexlet.io", status: 0 },
//     { key: "proxy", value: "123.234.53.22", status: -1 },
//     { key: "timeout", value: 50, status: -1 },
//     { key: "timeout", value: 20, status: 1 },
//     { key: "verbose", value: true, status: 1 },
//   ])
// );
