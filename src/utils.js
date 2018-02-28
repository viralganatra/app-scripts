const fs = require('fs');
const path = require('path');
const readPkgUp = require('read-pkg-up');
const which = require('which');

const { pkg, path: pkgPath } = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd()),
});

const appDirectory = path.dirname(pkgPath);

exports.fromRoot = (...pathName) => path.join(appDirectory, ...pathName);

exports.hasFile = (...p) => fs.existsSync(exports.fromRoot(...p));

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
