import { defineConfig } from "tsup";

export default defineConfig({
  tsconfig: "./tsconfig.build.json",
  entry: {
    index: "src/index.ts",
    chart: "src/chart.ts",
    dashboard: "src/dashboard.ts",
    datasource: "src/datasource.ts",
    query: "src/query.ts",
    schemas: "src/schemas.ts",
    stack: "src/stack.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  target: "es2020",
  splitting: false,
  outExtension({ format }) {
    return {
      js: format === "esm" ? ".mjs" : ".cjs",
    };
  },
});
