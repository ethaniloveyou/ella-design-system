import { useEffect } from 'react';
import { THEMES } from '../themes';
import { sceneState, setThemePos } from '../scene/sceneState';

/**
 * Maps document scroll onto a fractional theme position by interpolating
 * between section *centres*. Centres (rather than tops) mean each section
 * holds its own look while you read it, and the morph happens on the way
 * between two of them.
 */
export function useScrollScene(enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;

    let centres = [];
    let frame = 0;

    function measure() {
      centres = THEMES.map((t) => {
        const el = document.getElementById(t.id);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return r.top + window.scrollY + r.height / 2;
      }).filter((c) => c !== null);
    }

    function update() {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      sceneState.progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;

      if (centres.length < 2) return;
      const eye = window.scrollY + window.innerHeight / 2;

      if (eye <= centres[0]) return setThemePos(0);
      if (eye >= centres[centres.length - 1]) return setThemePos(centres.length - 1);

      for (let i = 0; i < centres.length - 1; i++) {
        if (eye >= centres[i] && eye < centres[i + 1]) {
          const span = centres[i + 1] - centres[i] || 1;
          return setThemePos(i + (eye - centres[i]) / span);
        }
      }
      return undefined;
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    function onPointer(e) {
      sceneState.pointerTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
      sceneState.pointerTarget.y = -((e.clientY / window.innerHeight) * 2 - 1);
    }

    function onResize() {
      measure();
      update();
    }

    measure();
    update();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    // Sections grow as images load; re-measure once things settle.
    const settle = setTimeout(onResize, 600);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointer);
      clearTimeout(settle);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);
}
