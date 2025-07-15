import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      plugins: [
        tailwindcss(),
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      server: {
        host: '0.0.0.0',
        port: 5173,
        hmr: {
          clientPort: 443,
          host: process.env.VITE_HMR_HOST ? new URL(process.env.VITE_HMR_HOST).hostname : 'localhost',
          protocol: process.env.VITE_HMR_HOST ? 'wss' : 'ws'
        },
        allowedHosts: ['.ngrok-free.app']
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
