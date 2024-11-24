import { defineConfig } from "vite"; // Importing Vite's defineConfig
import vue from "@vitejs/plugin-vue"; // Importing Vue plugin
import { resolve } from "path"; // Import path module

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "docs", // Change the output folder to docs or another folder if needed
  },
  base: "/Mod-Vite/", // Ensure this matches your repository name
  server: {
    hmr: true, // Disable Hot Module Replacement (HMR)
    watch: {
      usePolling: true, // Enable polling to detect file changes
      interval: 100, // Polling interval in ms
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // Alias for the src folder
      vue: "vue/dist/vue.esm-bundler.js", // Ensures Vue is resolved correctly in the browser
    },
  },
});
