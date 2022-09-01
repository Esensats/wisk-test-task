/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  // env: {
  //   node: true,
  // },
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  overrides: [
    {
      files: ['cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended'],
    },
  ],
  rules: {
    'prettier/prettier': ['off'],
    '@typescript-eslint/no-var-requires': 0,
  },
}
