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
  build: {
    outDir: "dist", // Output to the dist directory
  },
  base: "/Tome-Custom/", // Ensure this matches your repository name
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
