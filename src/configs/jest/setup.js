global.snapshotDiff = require('snapshot-diff');
global.fetch = require('jest-fetch-mock');

console.error = (err) => {
  throw new Error(err);
};
