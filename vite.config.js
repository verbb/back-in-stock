import { defineConfig } from 'vite';

export default defineConfig({
    root: './src/web/assets/cp',
    base: '',
    resolve: {
        // One copy of Lit and one custom-element registry, whether Plugin Kit comes from npm or a local checkout.
        dedupe: ['lit', 'lit-element', 'lit-html', '@lit/reactive-element', '@verbb/plugin-kit-web', '@verbb/plugin-kit-core', '@verbb/plugin-kit-icons'],
    },
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
