const babelJest = require('babel-jest');
const config = require('./config');

module.exports = babelJest.createTransformer({ presets: [config] });
