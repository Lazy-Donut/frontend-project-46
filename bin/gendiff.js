#!/usr/bin/env node
import { Command } from 'commander';
import { cwd } from 'node:process';
import path from 'node:path';
import { genDiff } from '../src/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const fixtures = path.resolve(cwd(), './__fixtures__');
    filepath1 = path.resolve(fixtures, filepath1);
    filepath2 = path.resolve(fixtures, filepath2);
    console.log(genDiff(filepath1, filepath2));
  });

program.parse();
