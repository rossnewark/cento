import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { splitVendorChunkPlugin } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Remove fastRefresh option as it's not recognized
      include: '**/*.{jsx,tsx}',
    }),
    // Split vendor chunks for better caching
    splitVendorChunkPlugin(),
  ],
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'framer-motion',
      'react-intersection-observer',
      'swiper',
      'lucide-react'
    ],
    exclude: [],
  },
  // Build optimization
  build: {
    target: 'es2015', // Target modern browsers
    outDir: 'dist',
    assetsDir: 'assets',
    // Chunk splitting strategy
    rollupOptions: {
      output: {
        manualChunks: {
          // Group React and related packages
          'react-vendor': ['react', 'react-dom'],
          // Group animation libraries
          'animation-vendor': ['framer-motion', 'react-intersection-observer'],
          // Group other UI components
          'ui-vendor': ['swiper', 'lucide-react'],
        },
      },
    },
    // Minimize bundle size
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true, // Remove debugger statements
      },
    },
    // Generate source maps for debugging
    sourcemap: false, // Set to true for development
    // Reduce chunk size
    chunkSizeWarningLimit: 600,
    // CSS optimization
    cssCodeSplit: true,
    // Preload key assets
    reportCompressedSize: false, // Faster builds
  },
  // Server options for development
  server: {
    hmr: {
      overlay: true,
    },
    // Compress responses
    cors: true,
  },
  // Use esbuild to transform CSS
  css: {
    devSourcemap: true,
  },
  // Add resolution aliases
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});