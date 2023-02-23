import _ from "lodash";

const prepareValue = (value) => {
  if (_.isObject(value)) {
    return "[complex value]";
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const iter = (diff, basePath) => {
  const onlyChangedProperties = diff.filter(
    (item) => item.status !== "unchanged"
  );
  const output = onlyChangedProperties
    .map((item) => {
      const currentPath = [...basePath, item.name];
      const property = currentPath.join(".");

      switch (item.status) {
        case "added":
          return `Property '${property}' was added with value: ${prepareValue(
            item.newValue
          )}`;

        case "removed":
          return `Property '${property}' was removed`;

        case "updated":
          return `Property '${property}' was updated. From ${prepareValue(
            item.oldValue
          )} to ${prepareValue(item.newValue)}`;
        case "nested":
          return iter(item.children, currentPath);
      }
    })
    .join("\n");

  return output;
};

const format = (diff) => {
  return iter(diff, []);
};

export default format;
