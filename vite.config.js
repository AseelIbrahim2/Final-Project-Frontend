// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   // server:{
//   //   '/api'
//   // }
// })

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      port: 3000,
      strictPort: true,
      proxy: {
        // Proxy API requests to your backend
        '/api': {
          target: env.VITE_BACKEND_URL || 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        },
        '/auth': {
          target: env.VITE_BACKEND_URL || 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        }
      }
    },
    define: {
      // Properly expose environment variables to your app
      'process.env': {
        VITE_GOOGLE_CLIENT_ID: JSON.stringify(env.VITE_GOOGLE_CLIENT_ID),
        VITE_BACKEND_URL: JSON.stringify(env.VITE_BACKEND_URL),
        // Add other variables you need
      }
    },
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
      exclude: [],
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
        // Additional optimizations
        define: {
          global: 'globalThis'
        }
      },
      include: [
        '@react-oauth/google',
        'jwt-decode',
        'react-router-dom'
      ]
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true
      }
    }
  };
});
