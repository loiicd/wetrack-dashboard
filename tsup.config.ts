import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    chart: "src/chart.ts",
    connector: "src/connector.ts",
    dashboard: "src/dashboard.ts",
    datasource: "src/datasource.ts",
    query: "src/query.ts",
    schemas: "src/schemas.ts",
    stack: "src/stack.ts",
  },
  format: ["esm", "cjs"],
  dts: {
    tsconfig: "./tsconfig.build.json",
  },
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
