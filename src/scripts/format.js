const path = require('path');
const { spawnSync } = require('child_process');
const { hasPkgProp, hasFile, resolveBin } = require('../utils');

const here = (p) => path.join(__dirname, p);

const FILES_TO_APPLY = ['**/*.+(js|jsx)'];
const args = process.argv.slice(2);

const useBuiltinConfig =
  !args.includes('--config') &&
  !hasFile('.prettierrc') &&
  !hasFile('.prettierrc.js') &&
  !hasFile('prettier.config.js') &&
  !hasPkgProp('prettier');

const config = useBuiltinConfig
  ? ['--config', here('../configs/prettier/config.js')]
  : [];

const useBuiltinIgnore = !args.includes('--ignore-path') && !hasFile('.prettierignore');

const ignore = useBuiltinIgnore
  ? ['--ignore-path', here('../configs/prettier/ignore')]
  : [];

const write = args.includes('--no-write') ? [] : ['--write'];

// this ensures that when running format as a pre-commit hook and we get
// the full file path, we make that non-absolute so it is treated as a glob,
// This way the prettierignore will be applied
const relativeArgs = args.map((a) => a.replace(`${process.cwd()}/`, ''));

const result = spawnSync(
  resolveBin('prettier'),
  [...config, ...ignore, ...write, ...FILES_TO_APPLY].concat(relativeArgs),
  { stdio: 'inherit' },
);

process.exit(result.status);
