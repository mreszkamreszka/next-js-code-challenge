import nextPlugin from '@next/eslint-plugin-next';
import vitestPlugin from '@vitest/eslint-plugin';
import tripleConfigReact from 'eslint-config-triple/react';
import jestDomPlugin from 'eslint-plugin-jest-dom';
import testingLibraryPlugin from 'eslint-plugin-testing-library';

export default [
  ...tripleConfigReact,
  nextPlugin.configs['core-web-vitals'],
  {
    ignores: ['reports/**/*', 'test-results/**/*', '.vscode', 'next-env.d.ts'],
  },
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
  {
    rules: {
      // Consistently import navigation APIs from `@/navigation`
      'no-restricted-imports': [
        'error',
        {
          name: 'next/link',
          message: 'Please import from `navigation` instead.',
        },
        {
          name: 'next/navigation',
          importNames: [
            'redirect',
            'permanentRedirect',
            'useRouter',
            'usePathname',
          ],
          message: 'Please import from `navigation` instead.',
        },
      ],
    },
  },

  // test file configuration
  {
    files: ['src/**/*.+(spec|test).[jt]s?(x)'],
    plugins: {
      vitest: vitestPlugin,
      ...jestDomPlugin.configs['flat/recommended'].plugins,
      ...testingLibraryPlugin.configs['flat/react'].plugins,
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,
      ...jestDomPlugin.configs['flat/recommended'].rules,
      ...testingLibraryPlugin.configs['flat/react'].rules,
    },
  },
];
