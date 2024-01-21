import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('should return the correct difference string', () => {
  const file1 = '__fixtures__/file1.json';
  const file2 = '__fixtures__/file2.json';
  const expectedDiff = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  expect(genDiff(file1, file2)).toEqual(expectedDiff);
});

test('should return the correct difference string with absolute path', () => {
  const file1 = path.resolve(__dirname, '../__fixtures__/file1.json');
  const file2 = path.resolve(__dirname, '../__fixtures__/file2.json');
  const expectedDiff = `- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true`;
  expect(genDiff(file1, file2)).toEqual(expectedDiff);
});
