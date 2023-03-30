import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

export default {
  input: 'src/index.ts',
  output: [
    // six output modes, choose umd
    {
      file: 'dist/index.js',
      format: 'umd',
      name: 'SimpleTemplate'
    }
  ],
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    json(),
    typescript(), // ts first, then babel
    babel({
      exclude: 'node_modules/**'
    }),
    IS_PRODUCTION && terser()
  ],
  external: [], // external module
  watch: {
    include: 'src/**',
    exclude: 'node_modules/**'
  }
}
