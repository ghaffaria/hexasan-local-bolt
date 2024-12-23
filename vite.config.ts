import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0',
        port: 4444,
    },
    define: {
        'process.env.API_BASE_URL': JSON.stringify('http://10.0.51.89:5555'),
    },
    optimizeDeps: {
        esbuildOptions: {
            define: {
                global: 'globalThis',
            },
        },
    }
});
