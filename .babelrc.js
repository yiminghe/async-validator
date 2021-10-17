console.log('Load babel config');

module.exports = api => {
  api.cache(false);
  return {
    presets: [
      [
        '@babel/preset-env',
        api.env('test')
          ? { targets: { node: true } }
          : {
              loose: true,
              modules: false,
            },
      ],
      '@babel/preset-typescript',
    ],
  };
};
