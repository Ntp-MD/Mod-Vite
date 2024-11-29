import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import Components from "unplugin-vue-components/vite";

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
    outDir: "docs", // Ensure this matches your deployment folder
  },
  base: "/Mod-Vite/", // Ensure this matches your repository name
  server: {
    hmr: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // Alias for src folder
      "@img": resolve(__dirname, "src/assets/"),
    },
  },
});
