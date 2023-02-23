import _ from "lodash";

const defaultIndent = "    ";

export const prepareValue = (obj, depth) => {
  if (!_.isObject(obj)) return obj;

  const indent = defaultIndent.repeat(depth + 1);

  const [head, ...tail] = JSON.stringify(obj, null, defaultIndent)
    .replaceAll('"', "")
    .replaceAll(",", "")
    .split("\n");

  const formatedTail = tail.map((line) => `${indent}${line}`);

  return [head, ...formatedTail].join("\n");
};

const format = (diff) => {
  const iter = (diff, depth) => {
    const indent = defaultIndent.repeat(depth);

    const formatedDiff = diff.flatMap((element) => {
      switch (element.status) {
        case "added":
          return [
            `${indent}  + ${element.name}: ${prepareValue(
              element.newValue,
              depth
            )}`,
          ];
        case "removed":
          return [
            `${indent}  - ${element.name}: ${prepareValue(
              element.oldValue,
              depth
            )}`,
          ];
        case "unchanged":
          return [
            `${indent}    ${element.name}: ${prepareValue(
              element.oldValue,
              depth
            )}`,
          ];
        case "updated":
          return [
            `${indent}  - ${element.name}: ${prepareValue(
              element.oldValue,
              depth
            )}`,
            `${indent}  + ${element.name}: ${prepareValue(
              element.newValue,
              depth
            )}`,
          ];
        case "nested":
          return [
            `${indent}    ${element.name}: ${iter(
              element.children,
              depth + 1
            )}`,
          ];
      }
    });

    return ["{", formatedDiff, `${indent}}`].flat().join("\n");
  };
  return iter(diff, 0);
};

export default format;
