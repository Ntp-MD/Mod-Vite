import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  server: {
    hmr: {
      // Specify the client port if needed
      clientPort: 443,
    },
    watch: {
      usePolling: true, // Ensure file changes are detected
      interval: 100, // Polling interval
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
