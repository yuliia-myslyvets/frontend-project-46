import _ from "lodash";

const defaultIndent = "    ";

export const stringify = (obj, depth) => {
  const indent = defaultIndent.repeat(depth + 1);

  const [head, ...tail] = JSON.stringify(obj, null, defaultIndent)
    .replaceAll('"', "")
    .replaceAll(",", "")
    .split("\n");

  const formatedTail = tail.map((line) => `${indent}${line}`);

  return [head, ...formatedTail].join("\n");
};

const iter = (diff, depth) => {
  const indent = defaultIndent.repeat(depth);

  const formatedDiff = diff.map((element) => {
    let character;
    if (element.status === 1) {
      character = "  + ";
    }
    if (element.status === 0) {
      character = "    ";
    }
    if (element.status === -1) {
      character = "  - ";
    }
    const value = Array.isArray(element.value)
      ? iter(element.value, depth + 1)
      : _.isObject(element.value)
      ? stringify(element.value, depth)
      : element.value;

    return `${indent}${character}${element.key}: ${value}`;
  });

  return ["{", formatedDiff, `${indent}}`].flat().join("\n");
};

const stylishFormat = (diff) => {
  return iter(diff, 0);
};

export default stylishFormat;
