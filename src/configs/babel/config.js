const browserslist = require('browserslist');

const { appDirectory } = require('../../utils')

const IS_TEST_ENV = process.env.NODE_ENV === 'test';
const IS_PROD_ENV = process.env.NODE_ENV === 'production';
const IS_DEV_ENV = !IS_TEST_ENV && !IS_PROD_ENV;

const targetBrowsers = browserslist.loadConfig({ path: appDirectory });
const browsers = targetBrowsers ? { browsers: targetBrowsers } || { esmodules: true };

const envTargets = IS_TEST_ENV
  ? { node: 'current' }
  : browsers;

module.exports = () => ({
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        targets: envTargets,
        debug: IS_DEV_ENV,
      },
    ],
    require.resolve('@babel/preset-react'),
  ],
  plugins: [
    require.resolve('@babel/plugin-proposal-class-properties'),
    require.resolve('@babel/plugin-proposal-object-rest-spread'),
    IS_TEST_ENV
      ? null
      : require.resolve('babel-plugin-transform-react-remove-prop-types'),

    IS_TEST_ENV
      ? require.resolve('@babel/plugin-transform-modules-commonjs')
      : null,
  ].filter(Boolean),
});
