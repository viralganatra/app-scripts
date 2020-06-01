const { resolveBin } = require('../../utils');

const appScripts = resolveBin('app-scripts');

module.exports = {
  '*.+(js|jsx|ts|tsx|css|scss|less)': [`${appScripts} format`],
};
