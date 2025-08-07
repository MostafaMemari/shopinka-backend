import { defineConfig } from 'vite';
import swc from 'unplugin-swc';
export default defineConfig({
    plugins: [swc.vite()],
    optimizeDeps: {
        // Vite does not work well with optionnal dependencies,
        // mark them as ignored for now
        exclude: [
            '@nestjs/microservices',
            '@nestjs/websockets',
            'cache-manager',
            'class-transformer',
            'class-validator',
            'fastify-swagger',
        ],
    },
});