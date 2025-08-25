import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import stylisticJs from '@stylistic/eslint-plugin-js'

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
      '@stylistic/js': stylisticJs,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      '@stylistic/js/no-multi-spaces': 'error',
      '@stylistic/js/no-extra-semi': 'error',
      '@stylistic/js/indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/js/semi': ['error', 'never'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/js/quote-props': ['error', 'as-needed'],
      '@stylistic/js/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/js/eol-last': ['error', 'always'],
      '@stylistic/js/space-before-blocks': 'error',
      '@stylistic/js/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      '@stylistic/js/object-curly-spacing': ['error', 'always'],
      '@stylistic/js/keyword-spacing': ['error'],
      '@stylistic/js/arrow-spacing': ['error', { before: true, after: true }],
      '@stylistic/js/key-spacing': ['error', { beforeColon: false }],
      '@stylistic/js/arrow-parens': [2, 'as-needed', { requireForBlockBody: true }],
      '@stylistic/js/no-trailing-spaces': 'error',
      '@stylistic/js/no-multiple-empty-lines': ['error', { max: 2, maxBOF: 0 }],
      '@stylistic/js/padded-blocks': ['error', 'never'],
    },
  },
])
