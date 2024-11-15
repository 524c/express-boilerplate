import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/app.ts"],
  format: ["cjs", "esm"],
  dts: false,
  sourcemap: true,
  target: "node16",
  clean: true,
});
