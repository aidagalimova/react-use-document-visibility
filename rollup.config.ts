import typescript from "rollup-plugin-typescript2";
import { default as pckg } from "./package.json";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
export default {
  input: "src/index.ts",
  output: [
    {
      file: pckg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    nodeResolve(),
    typescript({ objectHashIgnoreUnknownHack: false }),
    commonjs(),
  ],
  external: ["react", "react-dom"],
};
