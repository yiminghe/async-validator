console.log('Load babel config');

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
  ],

  // plugins:[["@babel/plugin-transform-runtime",{
  //   helpers:false,
  //
  // }],
  //   ["module-resolver", {
  //     "root": ["./src"],
  //     "alias": {
  //       "@babel/runtime/regenerator": "regenerator-runtime",
  //     }
  //   }]
  // ],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: true,
            },
          },
        ],
      ],
      plugins: ['@babel/plugin-transform-modules-commonjs'],
    },
  },
};
