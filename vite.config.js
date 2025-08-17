import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/sass/app.scss', 'resources/ts/App.tsx'],
            refresh: true,
        }),
        react({
            include: '**/*.{jsx,tsx}',
            jsxRuntime: 'automatic',
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources'),
            '@sass': path.resolve(__dirname, 'resources/sass'),
            '@ts': path.resolve(__dirname, 'resources/ts'),
            '@app': path.resolve(__dirname, 'resources/ts/app'),
            '@layouts': path.resolve(__dirname, 'resources/ts/layouts'),
            '@features': path.resolve(__dirname, 'resources/ts/features'),
            '@hooks': path.resolve(__dirname, 'resources/ts/hooks'),
            '@images': path.resolve(__dirname, 'resources/images'),
            '@components': path.resolve(__dirname, 'resources/ts/components'),
        },
    },
});
