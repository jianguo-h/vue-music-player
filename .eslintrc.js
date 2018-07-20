module.exports = {
    extends: ['airbnb-base', 'plugin:vue/essential'],
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
        ecmaVersion: 2017
    },
    env: {
        browser: true,
    },
    plugins: [
        'vue'
    ],
    'rules': {
        'semi': 0,                              // 要求或禁止使用分号代替 ASI
        'quotes': 0,                            // 强制使用一致的反勾号、双引号或单引号
        'no-new': 0,                            // 禁止使用 new 以避免产生副作用
        'no-var': 2,                            // 要求使用 let 或 const 而不是 var
        'eol-last': 0,                          // 要求或禁止文件末尾存在空行
        'brace-style': 0,                       // 强制在代码块中使用一致的大括号风格
        'prefer-const': 2,                      // 要求使用 const 声明那些声明后不再被修改的变量
        'comma-dangle': 2,                      // 禁止结尾有多余的逗号
        'no-unused-vars': 1,                    // 禁止出现未使用过的变量
        'spaced-comment': 0,                    // 要求或禁止在注释前有空白
        'no-multi-spaces': 0,                   // 禁止使用多个空格
        'keyword-spacing': 0,                   // 强制在关键字前后使用一致的空格
        'indent': ['error', 4],                 // 强制使用一致的缩进 4个空格
        'no-useless-return': 0,                 // 禁止多余的 return 语句
        'space-before-function-paren': 0,       // 强制在 function的左括号之前使用一致的空格
        'linebreak-style': 0,                   // 强制使用一致的换行风格
        'arrow-parens': 0,                      // 要求箭头函数的参数使用圆括号
        'no-use-before-define': 0,              // 禁止在变量定义之前使用它们
        'comma-dangle': 0,                      // 要求或禁止末尾逗号
        'prefer-destructuring': 0,              // 优先使用数组和对象解构
        'no-console': 0,                        // 禁用 console
        'global-require': 0,                    // 要求 require() 出现在顶层模块作用域中
        'object-curly-newline': 0,              // 强制大括号内换行符的一致性
        'no-underscore-dangle': 0,              // 禁止标识符中有悬空下划线
        'no-shadow': 2,                         // 禁止变量声明与外层作用域的变量同名
        'no-param-reassign': 0,                 // 禁止对 function 的参数进行重新赋值
        'no-restricted-syntax': 0,              // 禁用特定的语法
        'prefer-template': 0,                   // 要求使用模板字面量而非字符串连接
        'max-len': ['error', 150],              // 强制一行的最大长度
        'no-unused-expressions': 0,             // 禁止出现未使用过的表达式
        'no-plusplus': 0,                       // 禁用一元操作符 ++ 和 --
        'quote-props': 0,                       // 要求对象字面量属性名称用引号括起来
        'arrow-body-style': 0,                  // 要求箭头函数体使用大括号
        'radix': 0,                             // 强制在parseInt()使用基数参数
        'import/order': 0,
        'import/no-unresolved': 0,
        'import/newline-after-import': 0,
        'import/no-extraneous-dependencies': 0,
    },
    // https://segmentfault.com/q/1010000015135804
    "overrides": [
        // 解决vue文件中js代码的缩进问题
        {
            "files": ["*.vue"],
            "rules": {
                "indent": "off",
                "vue/script-indent": [
                    "error",
                    4,
                    { 
                        "baseIndent": 1 
                    }
                ]
            }
        }
    ]
}