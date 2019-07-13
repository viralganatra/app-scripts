const prettier = require('../prettier/config');

module.exports = {
  'parser': 'babel-eslint',
  'extends': ['airbnb', 'prettier', 'prettier/react', 'plugin:jest/recommended'],
  'env': {
    'browser': true,
    'node': true,
  },
  'rules': {
    'consistent-return': ['error', { treatUndefinedAsUnspecified: true }],    'lines-between-class-members': ['error', 'always', { 'exceptAfterSingleLine': true }],
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-underscore-dangle': [
      'error',
      { allow: ['__REDUX_DEVTOOLS_EXTENSION__', '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] },
    ],
    'no-unused-expressions': ['error', { allowShortCircuit: true }],

    'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }],
    'import/prefer-default-export': ['off'],

    'react/destructuring-assignment': ['off'],
    'react/no-array-index-key': ['warn'],
    'react/no-did-update-set-state': ['warn'],
    'react/no-unused-prop-types': ['error', { 'skipShapeProps': true }],
    'react/require-default-props': ['warn'],

    'react/jsx-filename-extension': ['error', { 'extensions': ['.js', '.jsx'] }],
    'react/jsx-no-bind': ['error'],
    'react/jsx-one-expression-per-line': ['off'],

    'react/sort-comp': ['error', {
      'order': [
        'static-methods',
        'instance-variables',
        'lifecycle',
        '/^on.+$/',
        'everything-else',
        '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
        '/^render.+$/',
        'render',
      ],
    }],

    'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],
    'jsx-a11y/label-has-for': ['off'],

    'prettier/prettier': ['error', prettier],
  },
  'plugins': [
    'babel',
    'react',
    'prettier',
  ],
  'overrides': [
    {
      'files': ['**/__tests__/*.js'],
      'plugins': [
        'jest',
      ],
      'env': {
        'jest': true,
      },
      'globals': {
        'mount': true,
        'shallow': true,
        'render': true,
      },
      'rules': {
        'jest/expect-expect': ['error'],
        'jest/lowercase-name': ['error'],
        'jest/no-large-snapshots': ['error'],
        'jest/no-test-return-statement': ['error'],
        'jest/valid-describe': ['error'],
        'jest/valid-expect-in-promise': ['error'],
      },
    },
  ],
};
