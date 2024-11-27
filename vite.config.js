import { defineConfig } from "vite"; // Import Vite's defineConfig
import vue from "@vitejs/plugin-vue"; // Import Vue plugin
import { resolve } from "path"; // Import path module
import Components from "unplugin-vue-components/vite"; // Import unplugin-vue-components

export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ["./src/components"], // Specify your components directory
      extensions: ["vue"], // File extensions to include
      deep: true, // Enable subdirectory scanning
    }),
  ],
  build: {
    outDir: "docs", // Change the output folder to docs or another folder if needed
  },
  base: "/Mod-Vite/", // Ensure this matches your repository name
  server: {
    hmr: true, // Enable Hot Module Replacement (HMR)
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
