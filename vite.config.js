import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Components from "unplugin-vue-components/vite"
import { resolve } from "path"

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
  base: "/Mod-Vite/", // Ensure this matches your repository name
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/css/variables.scss";`,
      },
    },
  },
  server: {
    hmr: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // Alias for src folder
      "@img": resolve(__dirname, "src/assets/"),
    },
  },
})
