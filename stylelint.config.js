/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],

  rules: {
    'import-notation': 'string',
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'import',
          'theme',
          'custom-variant',
          'layer',
          'apply',
        ],
      },
    ],
    'at-rule-no-deprecated': [
      true,
      {
        ignoreAtRules: ['apply'],
      },
    ],
  },
  overrides: [
    {
      files: ['src/ui/styles/global.css'],
      rules: {
        'custom-property-pattern': null,
        'keyframes-name-pattern': null,
        'value-keyword-case': null,
        'color-hex-length': null,
        'at-rule-empty-line-before': null,
        'rule-empty-line-before': null,
      },
    },
  ],
};
