global.snapshotDiff = require('snapshot-diff');

console.error = (err) => {
  throw new Error(err);
};
