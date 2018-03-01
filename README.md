<div align="center">
<h1>@viralganatra/app-scripts 🛠📦</h1>

<p>A collection of common scripts to make testing/linting easier in projects.</p>
</div>

<hr />

## What is this?

This is a collection of common scripts that abstract away general configuration for applications, such as linting, code style formatting, testing etc. In addition, you as a developer can override or extend all configs 👏.

## Why?

Projects typically have the same set of duplicated configs for testing/linting etc or worse yet different configs and rules.

This package has been created for two reasons:

1. Standardise configs so each application uses the same set of rules, ensuring code consistency.
2. Abstract the process of testing/linting etc into one package so you as a developer no longer need to setup everything manually.

## What is Included?

This package includes the following 2 scripts for use in applications:

* Prettier - Auto format your code style
* Husky & Lint Staged - Automatically execute Prettier when running Git commit

## Table of Contents

* [Installation](#installation)
* [How to use](#how-to-use)
* [Scripts Explained](#scripts-explained)
* [Customising](#customising)
* [Compatibility](#compatibility)

## Installation

Using `Yarn`

```
yarn add --dev @viralganatra/app-scripts
```

or `NPM`

```
npm install --save-dev @viralganatra/app-scripts
```

## How to use

Setup your package.json file with the following:

```json
{
  "scripts": {
    "format": "app-scripts format",
    "precommit": "app-scripts precommit"
  }
}
```

And execute a script, e.g.

```
yarn run format
```

## Scripts Explained

### Formatting Code

Running `yarn run format` will execute [Prettier](https://github.com/prettier/prettier) which will auto format your code and ensures it conforms to a consistent style (meaning no more code style discussions 👍).

By default the `node_modules` and `coverage` directories are ignored.

See [customising](#customising) section for advanced usage.

### Auto Formatting Code

While manually formatting code is okay, it can become a pain to do this yourself repeatedly. This script adds the ability to automatically run Prettier whenever you commit code. All you need to do is to add the following to your package.json:

```json
"precommit": "app-scripts precommit"`
```

Internally it uses a Git Hook (via the packages [Husky](https://github.com/typicode/husky) and [Lint Staged](https://github.com/okonet/lint-staged)) to check for staged files only and runs the format script on those files.

See [customising](#customising) section for advanced usage.

## Customising

All scripts have the ability for the config used to be modified, you can either specify your own config or extend the provided config. You can also pass any cli arguments and these will be passed onto the relevant script.

### Prettier

To supply your own config file the `format` script will automatically look for any one of the following and use them in place of the built-in config:

* Using the `'--config'` argument, e.g. `yarn run format --config ./file-to-config`
* .prettierrc in your project root
* .prettierrc.js in your project root
* .prettier.config.js in your project root
* The prettier key in your package.json

To extend the config file simply import it and modify it, e.g. create a .prettierrc.js file with:

```js
module.exports = Object.assign(
  require('@viralganatra/app-scripts/configs/prettier'),
  { singleQuote: true },
);
```

> We use Object.assign as opposed to the spread operator to prevent a bug with VSCode's ESLint plugin.

In addition you can also supply your own ignore file. The `format` script will automatically look for any one of the following:

* The `'--ignore-path'` argument, e.g. `yarn run format --ignore-path ./file-to-ignore-config`
* .prettierignore in your project root

### Lint Staged

To supply your own config file the `precommit` script will automatically look for any one of the following and use them in place of the built-in config:

* Using the `'--config'` argument, e.g.

```json
"precommit": "app-scripts precommit --config ./file-to-config"
```

* .lintstagedrc in your project root
* .lint-staged.config.js in your project root
* The lint-staged key in your package.json

To extend the config file simply import it and modify it, e.g. create a .lint-staged.config.js file with:

```js
module.exports = Object.assign(
  require('@viralganatra/app-scripts/configs/prettier'),
  {},
);
```

## Compatibility

* React and React Dom v16 are peer dependencies (therefore must be installed in your project).
* Node v8+ is required to run the scripts.

## Inspired By

Thanks to Kent C Dodds, this project is based on his work on [kcd-scripts](https://github.com/kentcdodds/kcd-scripts/).

## License

[MIT](LICENSE)
