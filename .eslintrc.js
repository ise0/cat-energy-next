module.exports = {
  extends: ['airbnb-base', 'airbnb-typescript/base', 'next/core-web-vitals', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.eslint.json',
  },
  rules: {
    '@typescript-eslint/dot-notation': 0,
    'import/prefer-default-export': 0,
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'consistent-return': 0,
    'import/order': 0,
  },
};
