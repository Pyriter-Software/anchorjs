import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/anchor.ts',
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  plugins: [typescript()]
};
