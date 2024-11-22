import { defineConfig } from 'vite';  // Importing Vite's defineConfig
import vue from '@vitejs/plugin-vue';  // Importing Vue plugin
import path from 'path';  // Import path module

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
      // Resolve alias for '@' to the 'src' directory
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
