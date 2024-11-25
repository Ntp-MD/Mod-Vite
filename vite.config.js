import { defineConfig } from "vite"; // Importing Vite's defineConfig
import vue from "@vitejs/plugin-vue"; // Importing Vue plugin
import { resolve } from "path"; // Import path module
import { ghPages } from "vite-plugin-gh-pages";

export default defineConfig({
  plugins: [
    vue(),
    ghPages(), // เพิ่มปลั๊กอินสำหรับ deploy อัตโนมัติ
  ],
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
