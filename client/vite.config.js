//import { defineConfig } from 'vite';
//import plugin from '@vitejs/plugin-react';

//// https://vitejs.dev/config/
//export default defineConfig({
//    plugins: [plugin()],
//    server: {
//        port: 56805,
//    }
//})

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
        },
    },
});
