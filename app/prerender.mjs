// Injects the server-rendered content layer into the built index.html.
// Run after `vite build` and `vite build --ssr`.

import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const { render } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href);

const html = readFileSync('dist/index.html', 'utf8');
const app = render();

const MARKER = '<div id="root"></div>';
if (!html.includes(MARKER)) {
  throw new Error('prerender: could not find the root container in dist/index.html');
}

writeFileSync('dist/index.html', html.replace(MARKER, `<div id="root">${app}</div>`));
rmSync('dist-ssr', { recursive: true, force: true });

console.log(`prerendered ${(app.length / 1024).toFixed(1)} kB of content into dist/index.html`);
