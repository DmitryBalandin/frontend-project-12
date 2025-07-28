import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/



export default defineConfig({
  plugins: [react()],
   build: {
    outDir: './dist',
  },
//  root: path.resolve(__dirname),
//   resolve: {
//     alias: {
//       '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
//     }
//   },
//   server: {
//     port: 8080,
//     hot: true
//   },

  

  server: {
    port: 5001,
    proxy: {
      // Проксируем запросы к API
      '/api': {
        target: 'http://localhost:5002',
      },
      // Проксируем WebSocket соединения
      '/socket.io': {
        target: 'ws://localhost:5001',
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          'import',
          'mixed-decls',
          'color-functions',
          'global-builtin',
        ],
      },
    },
  },
});

