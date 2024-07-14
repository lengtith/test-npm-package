module.exports = {
  extends: [
    // your other extensions
    'plugin:react/jsx-runtime',
  ],
  rules: {
    // your other rules
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { 'varsIgnorePattern': '^React$' }],
  },
};