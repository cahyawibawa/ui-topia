// prettier.config.js
module.exports = {
  endOfLine: "lf",
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "es5",
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  plugins: [
    // comment for better diff
    "prettier-plugin-organize-imports",
    "prettier-plugin-tailwindcss",
  ],
};
