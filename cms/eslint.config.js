import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { FlatCompat } from '@eslint/eslintrc'
import importPlugin from 'eslint-plugin-import'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default tseslint.config(
  {
    ignores: ['**/node_modules/**', '**/build/**', '**/dist/**'],
  },
  ...tseslint.configs.recommended,
  ...compat.extends('@feature-sliced/eslint-config'),
  {
    plugins: {
      import: importPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 'latest',
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      // `views` вместо каноничного `pages` из FSD
      'boundaries/elements': [
        {
          type: 'app',
          pattern: 'app/!(_*){,/*}',
          mode: 'folder',
          capture: ['slices'],
        },
        {
          type: 'app',
          pattern: 'src/*.{ts,tsx}',
          mode: 'file',
        },
        {
          type: 'pages',
          pattern: 'views/!(_*){,/*}',
          mode: 'folder',
          capture: ['slices'],
        },
        {
          type: 'widgets',
          pattern: 'widgets/!(_*){,/*}',
          mode: 'folder',
          capture: ['slices'],
        },
        {
          type: 'features',
          pattern: 'features/!(_*){,/*}',
          mode: 'folder',
          capture: ['slices'],
        },
        {
          type: 'entities',
          pattern: 'entities/!(_*){,/*}',
          mode: 'folder',
          capture: ['slices'],
        },
        {
          type: 'shared',
          pattern: 'shared/!(_*){,/*}',
          mode: 'folder',
          capture: ['slices'],
        },
      ],
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-hooks/set-state-in-effect': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // Сегменты store/utils в CMS не из канона FSD (ui/model/lib/api) —
      // public-api из @feature-sliced здесь шумный, слои ловит boundaries.
      'import/no-internal-modules': 'off',
      // Контекст модалок живёт в app, потому что собирает фичи.
      // Виджеты и страницы открывают его, но не остальной app.
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          message:
            '"${file.type}" is not allowed to import "${dependency.type}" | See rules: https://feature-sliced.design/docs/reference/layers/overview ',
          rules: [
            { from: 'app', allow: ['app', 'pages', 'widgets', 'features', 'entities', 'shared'] },
            { from: 'pages', allow: ['widgets', 'features', 'entities', 'shared', ['app', { slices: 'contexts' }]] },
            { from: 'widgets', allow: ['features', 'entities', 'shared', ['app', { slices: 'contexts' }]] },
            { from: 'features', allow: ['entities', 'shared'] },
            { from: 'entities', allow: ['shared'] },
            { from: 'shared', allow: ['shared'] },
          ],
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'JSXAttribute[name.name="sx"]',
          message: 'Стили пиши в styles.module.scss, не в sx.',
        },
        {
          selector: 'JSXAttribute[name.name="style"]',
          message: 'Стили пиши в styles.module.scss, не в style.',
        },
        {
          selector: 'Property[key.name="sx"]',
          message: 'Стили пиши в styles.module.scss, не в sx.',
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'unknown',
          ],
          pathGroups: [
            {
              pattern: './*.scss',
              group: 'unknown',
              position: 'after',
            },
            {
              pattern: './**/*.scss',
              group: 'unknown',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'external'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
)
