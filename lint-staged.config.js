export default {
  ignore: ['next-env.d.ts'],
  '*.(js|cjs|mjs|jsx|ts|tsx)':
    'eslint --fix --max-warnings 0 --no-warn-ignored',
  '*.(ts)': () => 'tsc -p tsconfig.json --noEmit',
  '*.css': 'stylelint --fix',
  '*': 'prettier --write --ignore-unknown',
};
