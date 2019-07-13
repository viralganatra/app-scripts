const fs = require('fs');
const path = require('path');
const readPkgUp = require('read-pkg-up');
const which = require('which');

const { package: pkg, path: pkgPath } = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd()),
});

const envIsSet = (name) => {
  return (
    process.env.hasOwnProperty(name) &&
    process.env[name] &&
    process.env[name] !== 'undefined'
  )
}

const appDirectory = path.dirname(pkgPath);

exports.appDirectory = appDirectory;

exports.fromRoot = (...pathName) => path.join(appDirectory, ...pathName);

exports.hasFile = (...p) => fs.existsSync(exports.fromRoot(...p));

exports.pkg = pkg;

exports.hasPkgProp = (prop) => Object.keys(pkg).includes(prop);

exports.resolveBin = (modName, { executable = modName, cwd = process.cwd() } = {}) => {
  let pathFromWhich;

  try {
    pathFromWhich = fs.realpathSync(which.sync(executable));
  } catch (error) {}

  try {
    const modPkgPath = require.resolve(`${modName}/package.json`);
    const modPkgDir = path.dirname(modPkgPath);
    const { bin } = require(modPkgPath);
    const binPath = (typeof bin === 'string') ? bin : bin[executable];
    const fullPathToBin = path.join(modPkgDir, binPath);

    if (fullPathToBin === pathFromWhich) {
      return executable;
    }

    return fullPathToBin.replace(cwd, '.');
  } catch (error) {
    if (pathFromWhich) {
      return executable;
    }

    throw error;
  }
};

exports.getConcurrentlyArgs = (scripts, { killOthers = true } = {}) => {
  const colors = [
    'bgBlue',
    'bgGreen',
    'bgMagenta',
    'bgCyan',
    'bgWhite',
    'bgRed',
    'bgBlack',
    'bgYellow',
  ];

  scripts = Object.entries(scripts).reduce((all, [name, script]) => {
    if (script) {
      all[name] = script;
    }

    return all;
  }, {});

  const prefixColors = Object.keys(scripts)
    .reduce(
      (pColors, _s, i) =>
        pColors.concat([`${colors[i % colors.length]}.bold.reset`]),
      [],
    )
    .join(',');

  return [
    killOthers ? '--kill-others-on-fail' : null,
    '--prefix', '[{name}]',
    '--names', Object.keys(scripts).join(','),
    '--prefix-colors', prefixColors,
    ...Object.values(scripts).map(s => JSON.stringify(s)),
  ].filter(Boolean);
}

exports.parseEnv = (name) => {
  if (envIsSet(name)) {
    try {
      return JSON.parse(process.env[name]);
    } catch (err) {
      return process.env[name];
    }
  }

  return false;
}
