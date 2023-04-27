module.exports = {
  root: true,
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  extends: [
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    'no-restricted-globals': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'arrow-body-style': 'off',
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-this-alias': 1,
  },
};
