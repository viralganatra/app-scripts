process.env.NODE_ENV = 'test';

const isCI = require('is-ci');
const jest = require('jest');
const { hasPkgProp, hasFile } = require('../utils');
const includedConfig = require('../configs/jest/config');

const args = process.argv.slice(2);

const watch =
  !isCI &&
  !args.includes('--no-watch') &&
  !args.includes('--collectCoverage') &&
  !args.includes('--updateSnapshot')
    ? ['--watch']
    : [];

const config =
  !args.includes('--config') &&
  !hasFile('jest.config.js') &&
  !hasPkgProp('jest')
    ? ['--config', JSON.stringify(includedConfig)]
    : [];

jest.run([...config, ...watch, ...args]);
