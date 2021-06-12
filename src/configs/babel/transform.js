const babelJest = require('babel-jest').default;
const config = require('./config');

module.exports = babelJest.createTransformer({ presets: [config] });
