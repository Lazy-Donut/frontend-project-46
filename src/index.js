import parseFile from '../src/parsers.js';
import _ from 'lodash';


const getReadyString = (object) => {
  const rawResult = object.map((element) => {
    let resultString = '';
    if (element.status === 'deleted') {
      resultString = `  - ${element.key}: ${element.value}`;
    } else if (element.status === 'added') {
      resultString = `  + ${element.key}: ${element.value}`;
    } else if (element.status === 'changed') {
      resultString = `  - ${element.key}: ${element.valueFirst}\n  + ${element.key}: ${element.valueSecond}`;
    } else if (element.status === 'unchanged') {
      resultString = `    ${element.key}: ${element.value}`;
    }
    return resultString;
  }).join('\n');
  return `{\n${rawResult}\n}`;
};

export default function genDiff(file1, file2) {

  const obj1 = parseFile(file1);
  const obj2 = parseFile(file2);

  const arr1 = Object.entries(obj1);
  const arr2 = Object.entries(obj2);

  const finalResult = [];
  let result = {};

  arr1.forEach(([key1, value1]) => {
    if (Object.hasOwn(obj2, key1) && obj1[key1] === obj2[key1]) {
      result = {};
      result.key = key1;
      result.value = value1;
      result.status = 'unchanged';
      finalResult.push(result);
    }
    if (!Object.hasOwn(obj2, key1)) {
      result = {};
      result.key = key1;
      result.value = value1;
      result.status = 'deleted';
      finalResult.push(result);
    }
    if (Object.hasOwn(obj2, key1) && obj1[key1] !== obj2[key1]) {
      result = {};
      result.key = key1;
      result.valueFirst = value1;
      result.valueSecond = obj2[key1];
      result.status = 'changed';
      finalResult.push(result);
    }
  });

  arr2.forEach(([key2, value2]) => {
    if (!Object.hasOwn(obj1, key2)) {
      result = {};
      result.key = key2;
      result.value = value2;
      result.status = 'added';
      finalResult.push(result);
    }
  });
  const sortedResult = _.sortBy(finalResult, ['key']);
  return getReadyString(sortedResult);
}
