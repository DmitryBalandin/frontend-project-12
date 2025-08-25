import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin-js'


export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },

    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  {
    plugins: {
      '@stylistic/jsx': stylistic,

    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      '@stylistic/jsx/no-multi-spaces': 'error',
      '@stylistic/jsx/no-extra-semi': 'error',
      '@stylistic/jsx/indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/jsx/semi': ['error', 'never'],
      '@stylistic/jsx/quotes': ['error', 'single'],
      '@stylistic/jsx/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/jsx/quote-props': ['error', 'as-needed'],
      '@stylistic/jsx/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/jsx/eol-last': ['error', 'always'],
      '@stylistic/jsx/space-before-blocks': 'error',
      '@stylistic/jsx/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      '@stylistic/jsx/object-curly-spacing': ['error', 'always'],
      '@stylistic/jsx/keyword-spacing': ['error'],
      '@stylistic/jsx/arrow-spacing': ['error', { before: true, after: true }],
      '@stylistic/jsx/key-spacing': ['error', { beforeColon: false }],
      '@stylistic/jsx/arrow-parens': [2, 'as-needed', { requireForBlockBody: true }],
      '@stylistic/jsx/no-trailing-spaces': 'error',
      '@stylistic/jsx/no-multiple-empty-lines': ['error', { max: 2, maxBOF: 0 }],
      '@stylistic/jsx/padded-blocks': ['error', 'never'],
      '@stylistic/jsx/brace-style': ['error', 'stroustrup'],
      '@stylistic/jsx/jsx-quotes': ['error', 'prefer-double'],
  

    },
  },

])
