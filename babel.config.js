// babel.config.js
// module.exports = {
//   presets: [
//     [
//       '@babel/preset-env',
//       {
//         targets: {
//           node: 'current',
//         },
//       },
//     ],
//   ],
// };

module.exports = function (api) {
  // api.cache(true);
  api.cache.never();

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    [
      "@babel/preset-react",
    ]
  ];
  const plugins = [
    "@babel/plugin-proposal-class-properties",
  ];

  return {
    presets,
    plugins
  };
}