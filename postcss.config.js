module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: ['> 5%', 'not ie <= 8', 'last 5 versions'],
    }),
  ],
};
