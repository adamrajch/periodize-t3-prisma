module.exports = {
  extends: ['mantine', 'plugin:@next/next/recommended', 'plugin:storybook/recommended'],
  plugins: ['testing-library'],
  overrides: [
    {
      files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'linebreak-style': 'off',
    'import/extensions': 'off',
    'import/order': 'off',
    'vars-on-top': 'off',
    'no-var': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/return-await': 'off',
  },
};
