// import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
// import replace from 'rollup-plugin-replace'
// import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

export default [
  // CommonJS
  {
    input: 'src/main.js',
    output: { file: 'lib/r-socs-core.js', format: 'cjs', indent: false },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
      'prop-types',
    ],
    plugins: [babel()]
  },

  // ES
  {
    input: 'src/main.js',
    output: { file: 'es/r-socs-core.js', format: 'es', indent: false },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
      'prop-types',
    ],
    plugins: [babel()]
  },

  // ES for Browsers
  // {
  //   input: 'src/main.js',
  //   output: { file: 'es/r-socs-core.mjs', format: 'es', indent: false },
  //   plugins: [
  //     nodeResolve({
  //       jsnext: true
  //     }),
  //     replace({
  //       'process.env.NODE_ENV': JSON.stringify('production')
  //     }),
  //     terser({
  //       compress: {
  //         pure_getters: true,
  //         unsafe: true,
  //         unsafe_comps: true,
  //         warnings: false
  //       }
  //     })
  //   ]
  // },

  // UMD Development
  // {
  //   input: 'src/main.js',
  //   output: { file: 'dist/r-socs-core.js', format: 'umd', name: 'Rsocs', indent: false },
  //   plugins: [
  //     nodeResolve({
  //       jsnext: true
  //     }),
  //     babel({
  //       exclude: 'node_modules/**'
  //     }),
  //     replace({
  //       'process.env.NODE_ENV': JSON.stringify('development')
  //     })
  //   ]
  // },

  // UMD Production
  // {
  //   input: 'src/main.js',
  //   output: { file: 'dist/r-socs-core.min.js', format: 'umd', name: 'Rsocs', indent: false },
  //   plugins: [
  //     nodeResolve({
  //       jsnext: true
  //     }),
  //     babel({
  //       exclude: 'node_modules/**'
  //     }),
  //     replace({
  //       'process.env.NODE_ENV': JSON.stringify('production')
  //     }),
  //     terser({
  //       compress: {
  //         pure_getters: true,
  //         unsafe: true,
  //         unsafe_comps: true,
  //         warnings: false
  //       }
  //     })
  //   ]
  // }
]