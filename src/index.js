import parseFile from './parsers.js';
import compareObjects from './makeAST.js';
import getDiffString from './formatters/stylish.js';

export default function genDiff(file1, file2) {
  const obj1 = parseFile(file1);
  const obj2 = parseFile(file2);
  const compared = compareObjects(obj1, obj2);
  return getDiffString(compared);
  //return compared[0].value[3];
}
