const path = require('path');
const { hasFile, hasPkgProp, fromRoot } = require('../../utils');

const here = (p) => path.join(__dirname, p);

const useBuiltInBabelConfig = !hasFile('.babelrc') && !hasPkgProp('babel');

const jestConfig = {
  coverageDirectory: path.join(fromRoot('src'), '../coverage'),
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  rootDir: fromRoot('src'),
  setupFiles: here('./setup.js'),
  setupFilesAfterEnv: ['jest-extended',],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testURL: 'http://localhost',
};

if (useBuiltInBabelConfig) {
  jestConfig.transform = { '^.+\\.js$': here('../babel/transform') };
}

module.exports = jestConfig;
