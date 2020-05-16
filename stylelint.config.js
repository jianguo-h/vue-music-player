module.exports = {
  extends: 'stylelint-prettier/recommended',
  rules: {
    'comment-empty-line-before': 'always',
    'rule-empty-line-before': [
      'always',
      { ignore: ['after-comment', 'inside-block'] },
    ],
  },
};
