# Ella — Three.js redesign

Vite + React + react-three-fiber rebuild of the Ella site as a single
continuous 3D scene with seven themed sections.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # client build + SSR prerender into dist/index.html
npm run preview
```

## How the 3D layer works

`src/themes.js` holds one entry per scroll section: palette, particle
behaviour, geometry shape, shader mode, post-processing. Scrolling maps to a
fractional position between section centres (`hooks/useScrollScene.js`), and
`scene/blend.js` lerps every value in that table once per frame. Nothing is
swapped — the same particle buffer, the same icosahedron and the same
background shader morph continuously between themes.

Section ids in `src/sections/index.jsx` must match theme ids. That string is
the only coupling between content and scene.

## Quality tiers

`hooks/useQualityTier.js` picks `high` / `medium` / `low` from core count,
device memory, WebGL support and `prefers-reduced-motion`. `low` never loads
the WebGL chunk at all — the CSS gradient layer in `index.css` carries the
palette instead. Force one with `?quality=low`.

## No-JavaScript

`npm run build` renders the content layer with `react-dom/server` and injects
it into `dist/index.html`; the client hydrates it. GitHub Pages has no server,
so this is what makes the site readable without JS.
