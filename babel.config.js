module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    [
      'component',
      {
        libraryName: 'mint-ui',
        style: true,
      },
    ],
  ],
};
