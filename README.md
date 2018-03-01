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

This package includes the following 4 scripts for use in applications:

* Prettier - Auto format your code style
* Husky & Lint Staged - Automatically execute Prettier when running Git commit
* Jest with Enzyme - Unit test your code
* ESLint - A curated set of rules and guides

## Table of Contents

* [Installation](#installation)
* [How to use](#how-to-use)
* [Scripts Explained](#scripts-explained)
* [Customising](#customising)
* [IDE Integration](#ide-integration)
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
    "precommit": "app-scripts precommit",
    "test": "app-scripts test",
    "lint": "app-scripts lint",
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

### Testing

Running `yarn run test` will execute [Jest](https://facebook.github.io/jest/). Included with this is [Enzyme](https://github.com/airbnb/enzyme) along with [Enzyme to JSON](https://github.com/adriantoine/enzyme-to-json) and [Jest Enzyme](https://github.com/FormidableLabs/enzyme-matchers) for your convenience.

This means you can test React components using something like:

```jsx
import React from 'react';

const Input = (props) => <input {...props} />;

describe('My Component', () => {
  it('should render an input', () => {
    const wrapper = shallow(<Input type="text" />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveProp('type', 'text');
  });
});
````
### Linting

Running `yarn run lint` will execute ESLint. The config provided extends from [Airbnb](https://github.com/airbnb/javascript) and includes plugins for [React](https://github.com/airbnb/javascript/tree/master/react), [JSX a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y), [Import](https://github.com/benmosher/eslint-plugin-import), [Prettier](https://github.com/prettier/prettier-eslint), [Jest](https://github.com/jest-community/eslint-plugin-jest) and more.

By default the `node_modules` and `coverage` directories are ignored. Unfortunately there is currently a bug with ESLint processing ignore files, so for now you'll have to include an .eslintignore in your project. For example:

```
node_modules
coverage
```

> Note the config includes an override section for Jest that only applies to files in the format `**/__tests__/*.js`, however because the config is not in the root directory the ESLint parser does not pick this up.
> Therefore it is recommended to extend the config and place it in your root directory.
> See [customising](#customising) section for usage.

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
### Jest

To supply your own config file the `test` script will automatically look for any one of the following and use them in place of the built-in config:

* Using the `'--config'` argument, e.g. `yarn run test --config ./file-to-config`
* jest.config.js in your project root
* The jest key in your package.json

To extend the config file simply import it and modify it, e.g. create a jest.config.js file with:

```js
module.exports = Object.assign(
  require('@viralganatra/app-scripts/configs/jest'),
  moduleNameMapper: {
    // Webpack aliases
  },
);
```

In addition the `test` script will use the built-in Babel config. To override this, it will automatically look for and use any one of the following:

* A `.babelrc` in your project root
* The `babel` key in your package.json

You will have to then configure the Babel test setup yourself. The `test` script sets the NODE_ENV to `test` which will be of use to you. (See the Babel config used in `src/configs/babel/config.js` to get an idea).

### ESLint

To supply your own config file the `lint` script will automatically look for any one of the following and use them in place of the built-in config:

* Using the `'--config'` argument, e.g. `yarn run lint --config ./file-to-config`
* .eslintrc in your project root
* .eslintrc.js in your project root
* The eslintConfig key in your package.json

To extend the config file simply import it and modify it, e.g. create a .eslintrc.js file with:

```js
module.exports = {
  extends: [require.resolve('@viralganatra/app-scripts/configs/eslint')],
  rules: {
    'no-unused-vars': ['warn'],
  },
};
```

In addition you can also supply your own ignore file. The `lint` script will automatically look for any one of the following:

* The `'--ignore-path'` argument, e.g. `yarn run lint --ignore-path ./file-to-ignore-config`
* .eslintignore in your project root
* The eslintIgnore key in your package.json

### IDE Integration

Typically, editors such as VSCode look for config files in the root directory of your project. However as the configs are held inside this package you will not get any integration by default. To overcome this, manually create the config in your root directory by exporting the built-in config. For example in the case of linting create an .eslintrc.js file with:

```js
module.exports = {
  extends: [require.resolve('@viralganatra/app-scripts/configs/eslint')],
};
```

## Compatibility

* React and React Dom v16 are peer dependencies (therefore must be installed in your project).
* Node v8+ is required to run the scripts.

## Inspired By

Thanks to Kent C Dodds, this project is based on his work on [kcd-scripts](https://github.com/kentcdodds/kcd-scripts/).

## License

[MIT](LICENSE)
