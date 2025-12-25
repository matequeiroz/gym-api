import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { prettier: eslintPluginPrettier },
    languageOptions: { globals: globals.node },
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
  {
    ignores: ['build/', 'node_modules/', 'dist/'],
  },
];
