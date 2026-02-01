import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import tsParser from '@typescript-eslint/parser'
import ts from '@typescript-eslint/eslint-plugin'
import { defineConfig } from 'eslint/config'

export default defineConfig([
    // ----------------------------------
    // Base JS rules
    // ----------------------------------
    js.configs.recommended,

    // ----------------------------------
    // React rules (JS + TS)
    // ----------------------------------
    react.configs.flat.recommended,

    // ----------------------------------
    // TypeScript files ONLY
    // ----------------------------------
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: { jsx: true },
            },
            globals: {
                ...globals.browser,
            },
        },
        plugins: {
            '@typescript-eslint': ts,
        },
        rules: {
            'no-undef': 'off',

            'no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],

            '@typescript-eslint/no-explicit-any': 'warn',

            semi: ['error', 'never'],
            'no-console': ['error', { allow: ['warn', 'error'] }],
            'react/react-in-jsx-scope': 'off',
            'react/no-unescaped-entities': 'off',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
])
