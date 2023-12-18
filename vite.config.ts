import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import manifest from '../pkg/manifest.json'
import metadata from '../pkg/metadata.json'

/*
IMPORTANT:
This must match the process name from pkg/manifest.json + pkg/metadata.json
The format is "/" + "process_name:package_name:publisher_node"
*/
const BASE_URL = `/${manifest[0].process_name}:${metadata.package}:${metadata.publisher}`;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: BASE_URL,
  build: {
    rollupOptions: {
      external: ['/our.js']
    }
  },
  server: {
    proxy: {
      '/our': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
      },
      [`${BASE_URL}/our.js`]: {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(BASE_URL, ''),
      },
      // '/example': {
      //   target: 'http://127.0.0.1:8080',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(BASE_URL, ''),
      // // This is only for debugging purposes
      //   configure: (proxy, _options) => {
      //     proxy.on('error', (err, _req, _res) => {
      //       console.log('proxy error', err);
      //     });
      //     proxy.on('proxyReq', (proxyReq, req, _res) => {
      //       console.log('Sending Request to the Target:', req.method, req.url);
      //     });
      //     proxy.on('proxyRes', (proxyRes, req, _res) => {
      //       console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
      //     });
      //   },
      // },
      // ADD YOUR PROXY ROUTES HERE
    }
  }
});
