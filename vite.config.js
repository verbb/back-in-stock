import { defineConfig } from 'vite';

export default defineConfig({
    root: './src/web/assets/cp',
    base: '',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        sourcemap: true,
        cssCodeSplit: false,
        rollupOptions: {
            input: 'src/js/cp.ts',
            output: {
                entryFileNames: 'js/cp.js',
                assetFileNames: (assetInfo) => assetInfo.names?.some((name) => name.endsWith('.css')) ? 'css/cp.css' : 'assets/[name][extname]',
            },
        },
    },
});
