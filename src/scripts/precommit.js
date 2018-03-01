const path = require('path');
const { spawnSync } = require('child_process');
const { hasFile, hasPkgProp, resolveBin } = require('../utils');

const args = process.argv.slice(2);

const here = (p) => path.join(__dirname, p);

const useBuiltInConfig =
  !args.includes('--config') &&
  !hasFile('.lintstagedrc') &&
  !hasFile('lint-staged.config.js') &&
  !hasPkgProp('lint-staged');

const config = useBuiltInConfig
  ? ['--config', here('../configs/lint-staged/config.js')]
  : [];

const lintStagedResult = spawnSync(
  resolveBin('lint-staged'),
  [...config, ...args],
  { stdio: 'inherit' },
);

process.exit(lintStagedResult.status);
