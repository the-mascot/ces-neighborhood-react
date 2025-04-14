module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json' // tsconfig 경로 (필요시 수정)
      }
    }
  },
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jsx-a11y',
    'import',
    'prettier'
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended'
  ],
  rules: {
    // 기본 스타일
    'prettier/prettier': 'error',

    // 타입스크립트 관련
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

    // React 관련
    'react/react-in-jsx-scope': 'off', // React 17 이후 자동 import
    'react/prop-types': 'off',         // TS를 쓰므로 prop-types 불필요

    // Import 정렬/중복 방지
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always'
      }
    ],
    'import/no-duplicates': 'warn'
  }
};
