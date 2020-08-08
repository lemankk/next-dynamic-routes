import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

import packageJson from "./package.json";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const input = "./src/index.ts";

export default [
  // CommonJS
  {
    input,
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.main.replace(".js", ".min.js"),
        format: "cjs",
        sourcemap: true, 
        plugins: [terser()],
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
      {
        file: packageJson.module.replace(".js", ".min.js"),
        format: "esm",
        sourcemap: true, 
        plugins: [terser()],
      },
      {
        file: packageJson.browser,
        name: packageJson.name,
        format: "umd",
        sourcemap: true,
      },
      {
        file: packageJson.browser.replace(".js", ".min.js"),
        name: packageJson.name,
        format: "umd",
        sourcemap: true, 
        plugins: [terser()],
      }
    ],
    plugins: [

    typescript({
      typescript: require("typescript"),
    }),
      babel({
        exclude: "node_modules/**"
      }),
      external(),
      resolve(),
      commonjs()
    ]
  },
];