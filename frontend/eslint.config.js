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
      '@stylistic': stylistic,

    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/space-before-blocks': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/keyword-spacing': ['error'],
      '@stylistic/arrow-spacing': ['error', { before: true, after: true }],
      '@stylistic/key-spacing': ['error', { beforeColon: false }],
      '@stylistic/arrow-parens': [2, 'as-needed', { requireForBlockBody: true }],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { max: 2, maxBOF: 0 }],
      '@stylistic/padded-blocks': ['error', 'never'],
      '@stylistic/brace-style': ['error', 'stroustrup'],


    },
  },

])
