import { defineConfig } from "vite";
import path from "node:path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: path.resolve(__dirname, "src"),
      },
    ],
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
  },
  build: {
    rollupOptions: {
      input: { "index.html": "./src/index.html" },
    },
    outDir: "dist/static",
  },
  plugins: [react()],
});
