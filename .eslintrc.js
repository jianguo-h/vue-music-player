module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'prettier/vue'
  ],
  plugins: [
    'vue'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2019,
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  rules: {
    'vue/script-indent': ['off', 2, { baseIndent: 1 }],
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-inferrable-types': ['error', {
      ignoreParameters: true,
      ignoreProperties: true
    }]
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
        '@typescript-eslint/explicit-function-return-type': 'off'
      }
    }
  ]
};
