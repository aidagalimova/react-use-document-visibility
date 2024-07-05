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
  external: ["react", "react-dom"],
};
