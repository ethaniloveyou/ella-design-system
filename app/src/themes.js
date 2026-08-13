// One entry per scroll section. Every value here is lerped between adjacent
// themes as you scroll, so the 3D scene morphs continuously rather than
// switching. Palettes come straight from the redesign spec.

export const THEMES = [
  {
    id: 'hero',
    label: { es: 'Ella', en: 'Ella' },
    // Bloom
    bgA: '#1a2f23', // deep forest
    bgB: '#2a2419', // warm charcoal
    particle: '#e8c4b8', // blush
    accent: '#c4a46c', // gold
    text: '#f5f0e8', // cream
    particles: { speed: 1.0, drift: 1.0, spread: 1.0, flicker: 0.0, settle: 0.0 },
    pos: [4.8, -0.9, -4.5],
    geo: { show: 1, freq: 1.15, amp: 0.3, facet: 0.0, scale: 1.0 },
    terrain: 0,
    shader: { heat: 0, ripple: 0, contour: 0, grain: 0.35 },
    post: { bloom: 0.6, aberration: 0.0, vignette: 0.55 },
  },
  {
    id: 'nutricion',
    label: { es: 'Nutrición', en: 'Nutrition' },
    // Botanical
    bgA: '#1a3a2a',
    bgB: '#2d3320',
    particle: '#4a7c59', // leaf
    accent: '#c17f59', // terracotta
    text: '#f0e6d6',
    particles: { speed: 0.55, drift: 0.35, spread: 0.8, flicker: 0.0, settle: 0.0 },
    pos: [5.6, -2.8, -5.0],
    geo: { show: 1, freq: 2.3, amp: 0.42, facet: 0.15, scale: 1.05 },
    terrain: 0,
    shader: { heat: 0, ripple: 0.1, contour: 0, grain: 0.3 },
    post: { bloom: 0.45, aberration: 0.0, vignette: 0.5 },
  },
  {
    id: 'ejercicio',
    label: { es: 'Ejercicio', en: 'Exercise' },
    // Thermal / ember
    bgA: '#2a1f1a',
    bgB: '#3d2418',
    particle: '#e8b84c', // gold
    accent: '#c4644c', // red-orange
    text: '#f5ede2',
    particles: { speed: 1.6, drift: 0.9, spread: 1.1, flicker: 1.0, settle: 0.0 },
    pos: [3.4, -1.6, -3.6],
    geo: { show: 1, freq: 1.7, amp: 0.34, facet: 1.0, scale: 1.0 },
    terrain: 0,
    shader: { heat: 1, ripple: 0, contour: 0, grain: 0.35 },
    post: { bloom: 0.8, aberration: 0.65, vignette: 0.5 },
  },
  {
    id: 'salud-mental',
    label: { es: 'Salud mental', en: 'Mental health' },
    // Lunar / tidal
    bgA: '#0f1a2e',
    bgB: '#16213a',
    particle: '#b8c4d4', // silver
    accent: '#c4b8d4', // lavender
    text: '#e8e4f0',
    particles: { speed: 0.22, drift: 0.5, spread: 1.25, flicker: 0.0, settle: 0.0 },
    pos: [0.0, -4.8, -5.5],
    geo: { show: 1, freq: 3.4, amp: 0.09, facet: 0.0, scale: 1.15 },
    terrain: 0,
    shader: { heat: 0, ripple: 1, contour: 0, grain: 0.22 },
    post: { bloom: 1, aberration: 0.0, vignette: 0.35 },
  },
  {
    id: 'suplementos',
    label: { es: 'Suplementos', en: 'Supplements' },
    // Topographic
    bgA: '#3a2f23',
    bgB: '#2a2119',
    particle: '#d4c4a8', // sand
    accent: '#7c8c6c', // sage
    text: '#f0eade',
    particles: { speed: 0.15, drift: 0.15, spread: 1.5, flicker: 0.0, settle: 1.0 },
    pos: [0.0, -3.0, -5.0],
    geo: { show: 0, freq: 1.0, amp: 0.1, facet: 0.4, scale: 0.6 },
    terrain: 1,
    shader: { heat: 0, ripple: 0, contour: 1, grain: 0.25 },
    post: { bloom: 0.2, aberration: 0.0, vignette: 0.45 },
  },
  {
    id: 'recursos',
    label: { es: 'Recursos', en: 'Resources' },
    // Convergence — particles cycle every previous accent
    bgA: '#1c1c22',
    bgB: '#242028',
    particle: '#c9bfae',
    accent: '#c4a46c',
    text: '#f0ece4',
    particles: { speed: 0.7, drift: 1.3, spread: 1.35, flicker: 0.25, settle: 0.0, rainbow: 1 },
    pos: [0.0, -2.0, -5.0],
    geo: { show: 0, freq: 1.0, amp: 0.2, facet: 0.0, scale: 0.8 },
    terrain: 0,
    shader: { heat: 0.15, ripple: 0.15, contour: 0, grain: 0.3 },
    post: { bloom: 0.55, aberration: 0.15, vignette: 0.5 },
  },
  {
    id: 'sobre',
    label: { es: 'Sobre', en: 'About' },
    // Bloom returns, grown
    bgA: '#1a2f23',
    bgB: '#2a2419',
    particle: '#e8c4b8',
    accent: '#c4a46c',
    text: '#f5f0e8',
    particles: { speed: 1.15, drift: 1.0, spread: 1.0, flicker: 0.0, settle: 0.0 },
    pos: [-5.6, -1.4, -4.5],
    geo: { show: 1, freq: 1.9, amp: 0.36, facet: 0.0, scale: 1.25 },
    terrain: 0,
    shader: { heat: 0, ripple: 0, contour: 0, grain: 0.35 },
    post: { bloom: 0.65, aberration: 0.0, vignette: 0.55 },
  },
];

export const THEME_BY_ID = Object.fromEntries(THEMES.map((t) => [t.id, t]));

// Accent per pillar, reused by the Recursos cards so each links back visually
// to the section it belongs to.
export const SECTION_ACCENT = Object.fromEntries(THEMES.map((t) => [t.id, t.accent]));
