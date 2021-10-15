console.log('Load babel config');

module.exports = api => {
  api.cache(false);
  return {
    presets: [
      ['@babel/preset-env', { targets: { node: true } }],
      '@babel/preset-typescript',
    ],
  };
};
