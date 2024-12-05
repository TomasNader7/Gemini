import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 56805,
        proxy: {
            '/api': {
                target: 'https://api.coingecko.com/api/v3',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
            '/__/auth': {
                target: 'https://gemini-f6761.firebaseapp.com',
                changeOrigin: true,
                secure: false,
            }
        },
        headers: {
            "Cross-Origin-Embedder-Policy": 'unsafe-none'
        }
    },
});
