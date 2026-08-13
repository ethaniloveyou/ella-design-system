import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Fade-and-rise reveals plus image parallax. 14px translate, ~600ms, ease-out
 * — the restrained end of the range, because the audience skews older and
 * playful motion reads as disorienting here.
 */
export function useReveal(deps = []) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      gsap.set('[data-reveal]', { opacity: 1, y: 0 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 88%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out', overwrite: true }),
      });

      gsap.utils.toArray('[data-parallax]').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -5 },
          { yPercent: 6, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } }
        );
      });
    });

    // Anything already on screen at mount should just be visible.
    ScrollTrigger.refresh();

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
