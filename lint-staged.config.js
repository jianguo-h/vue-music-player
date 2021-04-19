module.exports = {
  './**/*.{vue,js?(x),ts?(x)}': [
    'prettier --ignore-path .eslintignore --write',
    'eslint --fix',
  ],
  'src/**/*.{css,less,scss,sass}': ['prettier --write', 'stylelint --fix'],
};
