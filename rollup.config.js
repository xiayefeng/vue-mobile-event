import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import {eslint} from 'rollup-plugin-eslint';
import replace from 'rollup-plugin-replace';
import {uglify} from 'rollup-plugin-uglify';

export default {
  input: 'src/main.js',
  output: {
    format: 'cjs',
    file: 'dist/main.js',
    exports: 'named'
  },
  plugins: [
    resolve(),
    commonjs(),
    eslint({
      exclude: [
        'src/styles/**',
      ]
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
  ],
  external: []
};