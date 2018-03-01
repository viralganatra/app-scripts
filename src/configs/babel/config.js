const IS_TEST_ENV = process.env.NODE_ENV === 'test';
const IS_PROD_ENV = process.env.NODE_ENV === 'production';
const IS_DEV = !IS_TEST_ENV && !IS_PROD_ENV;

const envTargets = IS_TEST_ENV
  ? { node: '8.9' }
  : { browsers: ['last 2 Chrome versions'] };

module.exports = {
  presets: [
    [
      require.resolve('babel-preset-env'),
      {
        modules: false,
        targets: envTargets,
        debug: IS_DEV,
      },
    ],
    require.resolve('babel-preset-react'),
  ],
  plugins: [
    require.resolve('babel-plugin-transform-class-properties'),
    require.resolve('babel-plugin-transform-object-rest-spread'),
    IS_TEST_ENV
      ? null
      : require.resolve('babel-plugin-transform-react-remove-prop-types'),

    IS_TEST_ENV
      ? require.resolve('babel-plugin-transform-es2015-modules-commonjs')
      : null,
  ].filter(Boolean),
};
