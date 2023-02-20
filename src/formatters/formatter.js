import stylishFormat from "./stylish.js";

const formatter = (diff, formatName) => {
  switch (formatName) {
    case "stylish":
      return stylishFormat(diff);
    default:
      throw new Error(
        `This format is not supported. Please read the documentation and use the available formats`
      );
  }
};

export default formatter;
