import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/anchor.ts",
  output: [
    {
      file: "dist/anchor.js",
      format: "es",
      sourcemap: true
    },
    {
      file: "dist/anchor.cjs",
      format: "cjs",
      sourcemap: true
    }
  ],
  plugins: [typescript()]
};
