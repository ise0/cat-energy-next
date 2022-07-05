module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },

  ignorePatterns: ['.eslintrc.js', 'webpack.config.js'],
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: 'req|res|next|val' }],
    '@typescript-eslint/lines-between-class-members': 0,
    'import/prefer-default-export': 0,
    'consistent-return': 0,
    'no-param-reassign': ['error', { props: false }],
    'func-names': 0,
    'import/first': 0,
  },
};
