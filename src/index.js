import { readFileSync } from 'node:fs';
import _ from 'lodash';

const getReadyString = (object) => {
  let resultString = '';
  let i = 0;
  for (const element of object) {
    i += 1;
    if (i > 1) {
      resultString = `${resultString}\n`;
    }
    if (element.status === 'deleted') {
      resultString = `${resultString} - ${element.key}: ${element.value}`;
    } else if (element.status === 'added') {
      resultString = `${resultString} + ${element.key}: ${element.value}`;
    } else if (element.status === 'changed') {
      resultString = `${resultString} - ${element.key}: ${element.valueFirst}\n + ${element.key}: ${element.valueSecond}`;
    } else if (element.status === 'unchanged') {
      resultString = `${resultString}   ${element.key}: ${element.value}`;
    }
  }
  return resultString;
};

export const genDiff = (file1, file2) => {
  const readFile1 = readFileSync(file1, 'utf-8');
  const readFile2 = readFileSync(file2, 'utf-8');

  const obj1 = JSON.parse(readFile1);
  const obj2 = JSON.parse(readFile2);

  const finalResult = [];
  let result = {};

  for (const key1 in obj1) {
    if (Object.hasOwn(obj2, key1) && obj1[key1] === obj2[key1]) {
      result = {};
      result.key = key1;
      result.value = obj1[key1];
      result.status = 'unchanged';
      finalResult.push(result);
    }
    if (!Object.hasOwn(obj2, key1)) {
      result = {};
      result.key = key1;
      result.value = obj1[key1];
      result.status = 'deleted';
      finalResult.push(result);
    }
    if (Object.hasOwn(obj2, key1) && obj1[key1] !== obj2[key1]) {
      result = {};
      result.key = key1;
      result.valueFirst = obj1[key1];
      result.valueSecond = obj2[key1];
      result.status = 'changed';
      finalResult.push(result);
    }
  }
  for (const key2 in obj2) {
    if (!Object.hasOwn(obj1, key2)) {
      result = {};
      result.key = key2;
      result.value = obj2[key2];
      result.status = 'added';
      finalResult.push(result);
    }
  }
  const sortedResult = _.sortBy(finalResult, ['key']);
  return getReadyString(sortedResult);
};
