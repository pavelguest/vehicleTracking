module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest'],
  rules: {
    'object-curly-spacing': ['error', 'always'],
    'prettier/prettier': ['error', {bracketSpacing: true}],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'require-await': ['error'],
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-console': ['warn', {allow: ['warn', 'error']}],
        'react/no-unstable-nested-components': ['warn', {allowAsProps: true}],
      },
    },
  ],
};
