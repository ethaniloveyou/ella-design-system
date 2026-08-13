import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Relative base so the build works from a GitHub Pages project subpath
  // (/ella-design-system/) without hardcoding it.
  base: './',
  plugins: [react(), tailwindcss()],
});
