import typescript from "rollup-plugin-typescript2";
import { default as pckg } from "./package.json";
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
  plugins: [typescript({ objectHashIgnoreUnknownHack: true })],
  external: ["react", "react-dom"],
};
