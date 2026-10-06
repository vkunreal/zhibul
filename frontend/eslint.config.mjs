import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { FlatCompat } from '@eslint/eslintrc'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import importPlugin from 'eslint-plugin-import'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/out/**',
      '**/build/**',
      '**/next-env.d.ts',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  ...compat.extends('@feature-sliced/eslint-config'),
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'import/no-internal-modules': [
        'error',
        {
          allow: [
            '@/core/**',
            '@/widgets/**',
            '@/features/**',
            '@/entities/**',
            '@/shared/**',
            'next/**',
            '@next/**',
            'swiper/**',
            '@mui/**',
          ],
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
          ],
          // Each pattern is its own group, so `newlines-between` puts a blank
          // line between layers. `core` sits above widgets: it is the app shell.
          pathGroups: [
            {
              pattern: '@/{core,core/**}',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/{widgets,widgets/**}',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/{features,features/**}',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/{entities,entities/**}',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/{shared,shared/**}',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '{.,..}/**',
              group: 'parent',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
    },
  },
]

export default eslintConfig
