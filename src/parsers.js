import yaml from 'js-yaml';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const parseFile = (file) => {
  const extension = path.extname(file);
  switch (extension) {
    case '.json':
      return JSON.parse(readFileSync(file, 'utf-8'));
    case '.yaml':
    case '.yml':
      return yaml.load(readFileSync(file, 'utf-8'));
    default:
      console.log('Wrong file extension');
  }
  return null;
};

export default parseFile;
