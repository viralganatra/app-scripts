const prettier = require('../prettier/config');

module.exports = {
  'parser': 'babel-eslint',
  'extends': ['airbnb', 'prettier', 'prettier/react'],
  'env': {
    'browser': true,
  },
  'rules': {
    'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }],
    'import/prefer-default-export': ['off'],
    'lines-between-class-members': ['error', 'always', { 'exceptAfterSingleLine': true }],

    'react/no-unused-prop-types': ['error', { 'skipShapeProps': true }],
    'react/require-default-props': ['warn'],
    'react/no-array-index-key': ['warn'],

    'react/jsx-filename-extension': ['error', { 'extensions': ['.js', '.jsx'] }],
    'react/jsx-no-bind': ['error'],

    'react/sort-comp': ['error', {
      'order': [
        'static-methods',
        'lifecycle',
        '/^on.+$/',
        'everything-else',
        '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
        '/^render.+$/',
        'render',
      ],
    }],

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
        'react/prop-types': ['off'],
      },
    },
  ],
};
