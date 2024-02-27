/** @type {import("eslint").Linter.Config} */
const config = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
      project: true,
  },
  plugins: ['@typescript-eslint', 'tailwindcss'],
  extends: [
      'next/core-web-vitals',
      'plugin:@typescript-eslint/recommended-type-checked',
      'prettier',
      'plugin:tailwindcss/recommended',
  ],
  rules: {
      // These opinionated rules are enabled in stylistic-type-checked above.
      // Feel free to reconfigure them to your own preference.
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      'tailwindcss/no-custom-classnames': 'off',
      'eslint@typescript-eslint/no-unsafe-call': 'off',
      'tailwindcss/no-contradicting-classname': 'off',
      '@typescript-eslint/consistent-type-imports': [
          'warn',
          {
              prefer: 'type-imports',
              fixStyle: 'inline-type-imports',
          },
      ],
      '@typescript-eslint/no-unused-vars': [
          'warn',
          { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-misused-promises': [
          2,
          {
              checksVoidReturn: { attributes: false },
          },
      ],
  },
  settings: {
      tailwindcss: {
          callees: ['cn', 'cva'],
          config: './tailwind.config.ts',
          classRegex: '^(class(Name)?|tw)$',
      },
      next: {
          rootDir: ['./'],
      },
  },
}

module.exports = config
