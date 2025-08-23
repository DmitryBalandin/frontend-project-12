import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/



// export default defineConfig({
//   plugins: [react()],
//    build: {
//     outDir: './dist',
//   },

//   server: {
//     port: 5001,
//     proxy: {
//       // Проксируем запросы к API
//       '/api': {
//         target: 'http://localhost:5001',
//       },
//       // Проксируем WebSocket соединения
//       '/socket.io': {
//         target: 'ws://localhost:5001',
//         ws: true,
//         rewriteWsOrigin: true,
//       },
//     },
//   },
//   css: {
//     preprocessorOptions: {
//       scss: {
//         silenceDeprecations: [
//           'import',
//           'mixed-decls',
//           'color-functions',
//           'global-builtin',
//         ],
//       },
//     },
//   },
// });

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    proxy: {
      '/api': {
        // target: 'http://localhost:5001',
        target: 'http://127.0.0.1:5001',
        changeOrigin: false,
        secure: false,
      },
      cors: false,
      // Проксируем WebSocket соединения
      '/socket.io': {
        // target: 'ws://localhost:5001',
        target: 'ws://127.0.0.1:5001',
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
});