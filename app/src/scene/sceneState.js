// Mutable scroll/pointer state shared between the DOM listeners and the R3F
// render loop. Deliberately outside React: this updates every frame and a
// setState per frame would re-render the whole content tree.

import { THEMES } from '../themes';

export const sceneState = {
  // 0..THEMES.length-1, fractional. 2.4 = 40% of the way from theme 2 to 3.
  themePos: 0,
  // Raw document scroll progress, 0..1.
  progress: 0,
  // Pointer in normalized device coords, smoothed in the render loop.
  pointer: { x: 0, y: 0 },
  pointerTarget: { x: 0, y: 0 },
  // Set while a deep route (article, quiz…) is open — the scene idles.
  idle: false,
};

const listeners = new Set();

/** Subscribe to *section* changes only (integer theme index), not every frame. */
export function onSectionChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

let lastSection = -1;

export function setThemePos(pos) {
  sceneState.themePos = Math.max(0, Math.min(THEMES.length - 1, pos));
  const section = Math.round(sceneState.themePos);
  if (section !== lastSection) {
    lastSection = section;
    listeners.forEach((fn) => fn(section));
  }
}

/** Blend factor between the two themes bracketing themePos. */
export function themeBracket() {
  const p = sceneState.themePos;
  const a = Math.floor(p);
  const b = Math.min(THEMES.length - 1, a + 1);
  return [THEMES[a], THEMES[b], p - a];
}
