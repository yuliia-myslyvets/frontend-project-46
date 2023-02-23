import yaml from 'js-yaml';

const parse = (data, ext) => {
  switch (ext) {
    case '.json':
      return JSON.parse(data);

    case '.yaml':
    case '.yml':
      return yaml.load(data);

    default:
      return {};
  }
};

export default parse;
