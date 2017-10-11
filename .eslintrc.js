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
        'eol-last': 0,
        'brace-style': 0,
        'prefer-const': 2,
        'no-unused-vars': 1,
        'no-multi-spaces': 0,
        'keyword-spacing': 0,
        'indent': ['error', 4],
        'space-before-function-paren': 0,
    }
}