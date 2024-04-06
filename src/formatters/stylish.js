const getDiffString = (array, level = 0) => {
  const repeatedSpace = ' '.repeat(level * 4);
  const rawResult = array.map((element) => {
    let resultString = '';

    let val = element.value;
    let oldVal = null;
    let newVal = null;

    if (Array.isArray(val)) {
      val = getDiffString(val, level + 1);
    } else if (Array.isArray(val.old) || Array.isArray(val.new)) {
      if (Array.isArray(val.old)) {
        oldVal = getDiffString(val.old, level + 1);
      }
      if (Array.isArray((val.new))) {
        newVal = getDiffString(val.new, level + 1);
      }
    }
    if (val.old !== undefined && val.new !== undefined) {
      newVal = val.new;
      oldVal = val.old;
    }
    if (val === null) {
      val = 'null';
    }
    if (newVal === null) {
      newVal = 'null';
    }
    if (oldVal === null) {
      oldVal = 'null';
    }
    if (typeof val === 'object') {
      val = JSON.stringify(val, null, '    ').replace(/["]/g, '');
      val = '{\n' + val.split('\n').map((line) => '    ' + repeatedSpace + line).slice(1).join('\n');
    }
    if (typeof oldVal === 'object') {
      oldVal = JSON.stringify(oldVal, null, '    ').replace(/["]/g, '');
      oldVal = '{\n' + oldVal.split('\n').map((line) => '    ' + repeatedSpace + line).slice(1).join('\n');
    }
    if (typeof newVal === 'object') {
      newVal = JSON.stringify(newVal, null, '    ').replace(/["]/g, '');
      newVal = '{\n' + newVal.split('\n').map((line) => '    ' + repeatedSpace + line).slice(1).join('\n');
    }
    if (element.status === 'deleted') {
      resultString = `  - ${element.key}: ${val}`;
    } else if (element.status === 'added') {
      resultString = `  + ${element.key}: ${val}`;
    } else if (element.status === 'changed') {
      resultString = `  - ${element.key}: ${oldVal}\n${repeatedSpace}  + ${element.key}: ${newVal}`;
    } else if (element.status === 'unchanged') {
      resultString = `    ${element.key}: ${val}`;
    }
    return ' '.repeat(level * 4) + resultString;
  }).join('\n');
  return `{\n${rawResult}\n${repeatedSpace}}`;
};

export default getDiffString;
