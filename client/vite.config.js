import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh for better HMR
      fastRefresh: true,
      // Include development helpers
      include: "**/*.{jsx,tsx}",
      // Configure babel for better HMR support
      babel: {
        plugins: [
          // Add babel plugins for better dev experience if needed
        ],
      },
    }),
  ],
  server: {
    port: 3000,
    host: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
    // Enhanced HMR configuration
    hmr: {
      overlay: true,
      port: 24679, // Use a different port to avoid conflicts
    },
  },
  // Optimize dependencies for better performance
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "lucide-react",
      "react-hot-toast",
    ],
    exclude: ["@vite/client", "@vite/env"],
  },
  // Build configuration for better development experience
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          ui: ["lucide-react", "react-hot-toast"],
        },
      },
    },
  },
  // Esbuild configuration
  esbuild: {
    // Keep names for better debugging
    keepNames: true,
  },
  // Define configuration for better hot reload
  define: {
    __DEV__: JSON.stringify(true),
  },
});
