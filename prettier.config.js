/** @type {import("prettier").Config} */
export default {
  trailingComma: 'all',
  semi: true,
  singleQuote: true,
  endOfLine: 'auto',
  arrowParens: 'avoid',
  tailwindStylesheet: './src/ui/styles/global.css',
  tailwindAttributes: ['className', 'class'],
  tailwindFunctions: ['cn', 'cva'],
  plugins: ['prettier-plugin-tailwindcss'],
};
