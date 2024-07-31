const styleRules = {
  'prettier/prettier': 'error'
};

const reactRules = {
  'react/react-in-jsx-scope': 'off'
};

const es5Rules = {
  // require let or const instead of var
  'no-var': 'error',
  // disallow use of the Object constructor
  'no-new-object': 'error',
  // require method and property shorthand syntax for object literals
  'object-shorthand': 'warn',
  // Prefer destructuring from arrays and objects
  'prefer-destructuring': [
    'warn',
    {
      VariableDeclarator: {
        array: false,
        object: true
      },
      AssignmentExpression: {
        array: true,
        object: false
      }
    },
    {
      enforceForRenamedProperties: false
    }
  ],
  'prefer-template': 'warn',
  'no-new-func': 'error',
  'prefer-arrow-callback': 'warn',
  'no-duplicate-imports': 'warn',
  // disallow the use of Boolean literals in conditional expressions. also, prefer `a || b` over `a ? a : b`
  'no-unneeded-ternary': 'warn',
  'brace-style': 'error',
  'no-dupe-keys': 'error',
  curly: 'warn',
  'no-fallthrough': [
    'warn',
    {
      commentPattern: 'break[\\s\\w]*omitted'
    }
  ],
  eqeqeq: 'error',
  'padding-line-between-statements': [
    'warn',
    {
      blankLine: 'always',
      prev: '*',
      next: 'return'
    }
  ],
  'no-case-declarations': 'warn',
  'no-undef': 'off'
};

const a11yRules = {
  'jsx-a11y/anchor-is-valid': 'off',
  'jsx-a11y/click-events-have-key-events': 'warn',
  'jsx-a11y/no-static-element-interactions': 'warn',
  'jsx-a11y/role-supports-aria-props': 'warn',
  'jsx-a11y/anchor-has-content': 'warn',
  'jsx-a11y/no-autofocus': 'off'
};

const typescriptRules = {
  '@typescript-eslint/ban-ts-comment': 'off'
}

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  // 타입스크립트 구문 분석을 위해 사용
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // 모듈 시스템
    ecmaFeatures: {
      jsx: true // 리액트 jsx 파싱
    }
  },
  extends: [
    // ESLint 추천 룰셋
    'eslint:recommended',

    // 리액트 추천 룰셋
    'plugin:react/recommended',

    // 리액트 훅 추천 룰셋
    'plugin:react-hooks/recommended',

    // 접근성 추천 룰셋
    'plugin:jsx-a11y/recommended',

    // 타입스크립트 린트 추천 룰셋
    'plugin:@typescript-eslint/recommended',

    // 프리티어 추천 룰셋
    'plugin:prettier/recommended',
  ],
  plugins: ['import'],
  // import plugin의 rule 적용 필요시 하단에 룰 추가
  rules: {
    // 룰 정의
    ...styleRules,
    ...reactRules,
    ...a11yRules,
    ...es5Rules,
    ...typescriptRules
  }
};
