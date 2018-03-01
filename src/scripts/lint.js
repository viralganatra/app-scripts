const path = require('path');
const { spawnSync } = require('child_process');
const { hasPkgProp, hasFile, resolveBin } = require('../utils');

const here = (p) => path.join(__dirname, p);
const hereRelative = (p) => here(p).replace(process.cwd(), '.');

const FILES_TO_APPLY = ['.'];
const args = process.argv.slice(2);

const useBuiltinConfig =
  !args.includes('--config') &&
  !hasFile('.eslintrc') &&
  !hasFile('.eslintrc.js') &&
  !hasPkgProp('eslintConfig');

const config = useBuiltinConfig
  ? ['--config', hereRelative('../configs/eslint/config.js')]
  : [];

const useBuiltinIgnore =
  !args.includes('--ignore-path') &&
  !hasFile('.eslintignore') &&
  !hasPkgProp('eslintIgnore');

const ignore = useBuiltinIgnore
  ? ['--ignore-path', hereRelative('../configs/eslint/ignore')]
  : [];

const cache = args.includes('--no-cache') ? [] : ['--cache'];

const result = spawnSync(
  resolveBin('eslint'),
  [...config, ...ignore, ...cache, ...args, ...FILES_TO_APPLY],
  { stdio: 'inherit' },
);

process.exit(result.status);
