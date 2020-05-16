module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复代码问题
        'pref', // 性能优化
        'docs', // 修改文档
        'style', // 修改代码格式(不影响逻辑功能，比如格式化、补充分号等等)
        'refactor', // 重构代码(fix bug或增加新功能不属于此范围)
        'test', // 增加/修改测试用例
        'revert', // 回退到某个版本
        'chore', // 修改工具相关（包括但不限于文档、代码生成等, 比如修改了README，webpack配置文件等等）
        'deps', // 升级依赖
      ],
    ],
    'type-case': [0],
    'scope-case': [0],
    'subject-case': [0, 'never'],
  },
};
