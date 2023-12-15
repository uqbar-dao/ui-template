import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createProxyMiddleware } from 'http-proxy-middleware';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log('ENV:', env)

  const uqbarNodePort = env.VITE_NODE_PORT || 8080;
  const BASE_URL = '/main:ui:template.uq';  // this will be the package name from pkg/manifest.json + pkg/metadata.json

  return {
    plugins: [react()],
    server: {
      base: BASE_URL,
      configureServer: ({ middlewares }) => {
        middlewares.use(
          '/our.js', // Specify the path to the file
          createProxyMiddleware({
            target: 'http://localhost:8080/our.js', // The target server where the file is located
            changeOrigin: true,
          })
        );
      },
    },
  };
});
