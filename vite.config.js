import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ["./src/components"], // Directory for auto-imported components
      extensions: ["vue"], // Include .vue files
      deep: true, // Enable subdirectory scanning
    }),
  ],
  test: {
    globals: true, // To use describe, it, expect etc. without importing
    environment: "jsdom", // Or 'happy-dom' for faster DOM emulation if needed
    include: ["src/Test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], // Explicitly include test files
    // You can also add:
    // root: __dirname, // Or resolve(__dirname) if using import { resolve } from 'path';
    // coverage: { provider: 'v8' } // Optional: if you want coverage reports
  },
  build: {
    outDir: "dist", // Output to the dist directory
  },
  base: "/Mod-Vite/", // Ensure this matches your repository name
  server: {
    hmr: true,
    watch: {
      usePolling: true, // This can help in environments where file system events are not reliably detected
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // Alias for src folder
    },
  },
});
