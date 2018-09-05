const path = require('path');
const { hasFile, hasPkgProp, fromRoot } = require('../../utils');

const here = (p) => path.join(__dirname, p);

const useBuiltInBabelConfig = !hasFile('.babelrc') && !hasPkgProp('babel');

const jestConfig = {
  coverageDirectory: path.join(fromRoot('src'), '../coverage'),
  rootDir: fromRoot('src'),
  setupFiles: [here('../enzyme/config.js')],
  setupTestFrameworkScriptFile: here('./setup.js'),
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testURL: 'http://localhost',
};

if (useBuiltInBabelConfig) {
  jestConfig.transform = { '^.+\\.js$': here('../babel/transform') };
}

module.exports = jestConfig;
