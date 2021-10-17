console.log('Load babel config');

module.exports = api => {
  api.cache(false);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          modules: false,
        },
      ],
      '@babel/preset-typescript',
    ],
  };
};
