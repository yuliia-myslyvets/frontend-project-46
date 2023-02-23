#!/usr/bin/env node

import { program } from 'commander';
import buildDiff from '../src/buildDiff.js';

program
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    console.log(buildDiff(filepath1, filepath2, options.format));
  });

program.parse();
