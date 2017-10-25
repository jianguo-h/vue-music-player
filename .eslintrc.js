module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    extends: 'standard',
    plugins: [
        'html'
    ],
    'rules': {
        'semi': 0,
        'quotes': 0,
        'no-new': 0,
        'no-var': 2,
        'eol-last': 0,
        'brace-style': 0,
        'prefer-const': 2,
        'comma-dangle': 2,      // 禁止结尾有多余的逗号
        'no-unused-vars': 1,
        'spaced-comment': 0,    // 要求或禁止在注释前有空白
        'no-multi-spaces': 0,
        'keyword-spacing': 0,
        'indent': ['error', 4],
        'no-useless-return': 0,
        'space-before-function-paren': 0,
    }
}