import _ from 'lodash';

/**
 * Возвращает итог сравнения объектов
 *
 * @param {Object} obj1 Первый объект для сравнения
 * @param {Object} obj2 Второй объект для сравнения
 *
 * @returns {Object[]} Результирующий объект
 */
const compareObjects = (obj1, obj2) => {
  const result = [];
  const [arr1, arr2] = [Object.entries(obj1), Object.entries(obj2)];

  arr1.forEach(([key1, value1]) => {
    let value = value1;
    let status;
    const key = key1;

    if (typeof value === 'object' && typeof obj2[key1] === 'object') {
      value = compareObjects(value1, typeof (obj2[key1]) !== 'undefined' ? obj2[key1] : {});
    }

    if (Object.hasOwn(obj2, key1) && (obj1[key1] === obj2[key1] || (typeof obj1[key1] === 'object' && typeof obj2[key1] === 'object'))) {
      status = 'unchanged';
    } else if (Object.hasOwn(obj2, key1) && obj1[key1] !== obj2[key1]) {
      status = 'changed';
      value = {
        old: value,
        new: obj2[key1],
      };
    } else {
      status = 'deleted';
    }

    const resObject = { key, value, status };
    result.push(resObject);
  });

  arr2.forEach(([key2, value2]) => {
    if (!Object.hasOwn(obj1, key2)) {
      const value = value2;
      const key = key2;
      const status = 'added';
      result.push({ key, value, status });
    }
  });

  return _.sortBy(result, ['key']);
};

export default compareObjects;
