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
    outDir: "dist", // Output to the dist directory
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        },
      },
    },
  },
  base: "/", // Ensure this matches your repository name
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
