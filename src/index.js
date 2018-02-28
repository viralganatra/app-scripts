#!/usr/bin/env node

const path = require('path');
const { spawnSync } = require('child_process');

const attemptResolve = (...resolveArgs) => {
  try {
    return require.resolve(...resolveArgs);
  } catch (error) {
    return null;
  }
}

const [executor, , script, ...args] = process.argv;

if (!script) {
  throw new Error('No script specified - please select a script to run.');
}

const relativeScriptPath = path.join(__dirname, './scripts', script);
const scriptPath = attemptResolve(relativeScriptPath);

if (!scriptPath) {
  throw new Error(`Unknown script "${script}".`);
}

const result = spawnSync(executor, [scriptPath, ...args], {
  stdio: 'inherit',
});

if (result.signal === 'SIGKILL') {
  console.log(
    `The script "${script}" failed because the process exited too early.
    This probably means the system ran out of memory or someone called
    'kill -9' on the process.`,
  );

  process.exit(1);
} else if (result.signal === 'SIGTERM') {
  console.log(
    `The script "${script}" failed because the process exited too early.
    Someone might have called 'kill' or 'killall', or the system could
    be shutting down.`,
  );

  process.exit(1);
}

process.exit(result.status);
