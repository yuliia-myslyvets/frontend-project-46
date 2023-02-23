import stylishFormat from './stylish.js';
import plainFormat from './plain.js';
import jsonFormat from './json.js';

const formatter = (diff, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylishFormat(diff);
    case 'plain':
      return plainFormat(diff);
    case 'json':
      return jsonFormat(diff);
    default:
      throw new Error('This format is not supported.');
  }
};

export default formatter;
