console.log('Load babel config');

module.exports = (api) => {
  return ({
    presets: [
      [
        '@babel/preset-env',
        (api.env() !== 'test') ? ({
          loose: true,
          modules: false,
        }) : { targets: { node: true } },
      ],
    ],
  });
};
