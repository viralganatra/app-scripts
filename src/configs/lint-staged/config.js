const { resolveBin } = require('../../utils');

const appScripts = resolveBin('app-scripts');

module.exports = {
  linters: {
    '**/*.+(js|jsx)': [
      `${appScripts} format`,
      'git add',
    ],
  },
};
