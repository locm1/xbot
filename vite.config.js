import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        react(),
        laravel({
            input: ['resources/js/index.jsx'],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
            '@img': '/resources/assets',
            '@scss': '/resources/scss',
        },
    },
});
