// Lucide-style icons used across the kit. 1.5px stroke, rounded caps.
// Inline JSX so they're tweakable from a component file rather than fetched.

const SVG_BASE = {
  width: 24, height: 24, viewBox: '0 0 24 24',
  fill: 'none', stroke: 'currentColor', strokeWidth: 1.5,
  strokeLinecap: 'round', strokeLinejoin: 'round',
};

const IconHeart   = (p) => <svg {...SVG_BASE} {...p}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
const IconLeaf    = (p) => <svg {...SVG_BASE} {...p}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>;
const IconDumbbell= (p) => <svg {...SVG_BASE} {...p}><path d="M14.4 14.4 9.6 9.6"/><path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z"/><path d="m21.5 21.5-1.4-1.4"/><path d="M3.9 3.9 2.5 2.5"/><path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z"/></svg>;
const IconBrain   = (p) => <svg {...SVG_BASE} {...p}><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/></svg>;
const IconSun     = (p) => <svg {...SVG_BASE} {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>;
const IconMoon    = (p) => <svg {...SVG_BASE} {...p}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>;
const IconDroplet = (p) => <svg {...SVG_BASE} {...p}><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7Z"/></svg>;
const IconSparkle = (p) => <svg {...SVG_BASE} {...p}><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>;
const IconCheck   = (p) => <svg {...SVG_BASE} {...p}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>;
const IconArrow   = (p) => <svg {...SVG_BASE} {...p}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
const IconChevron = (p) => <svg {...SVG_BASE} {...p}><path d="m9 18 6-6-6-6"/></svg>;
const IconDown    = (p) => <svg {...SVG_BASE} {...p}><path d="m6 9 6 6 6-6"/></svg>;
const IconMenu    = (p) => <svg {...SVG_BASE} {...p}><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
const IconSearch  = (p) => <svg {...SVG_BASE} {...p}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const IconDownload= (p) => <svg {...SVG_BASE} {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>;
const IconUsers   = (p) => <svg {...SVG_BASE} {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconBookmark= (p) => <svg {...SVG_BASE} {...p}><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>;
const IconMail    = (p) => <svg {...SVG_BASE} {...p}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const IconQuote   = (p) => <svg {...SVG_BASE} {...p}><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>;
const IconCalendar= (p) => <svg {...SVG_BASE} {...p}><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>;
const IconWhatsApp= (p) => <svg {...p} width={p.width || 24} height={p.height || 24} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.42 5.82c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.24-8.24zm4.52 10.43c-.06-.1-.22-.16-.46-.28-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.39-.4-.54-.41l-.46-.01c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.57.18 1.1.16 1.51.1.46-.07 1.43-.58 1.63-1.15.2-.56.2-1.05.14-1.15z"/></svg>;

Object.assign(window, {
  IconHeart, IconLeaf, IconDumbbell, IconBrain, IconSun, IconMoon,
  IconDroplet, IconSparkle, IconCheck, IconArrow, IconChevron, IconDown,
  IconMenu, IconSearch, IconDownload, IconUsers, IconBookmark, IconMail, IconQuote,
  IconCalendar, IconWhatsApp,
});

// Single lookup-by-name entry point, for design-system export purposes.
const ICON_MAP = {
  heart: IconHeart, leaf: IconLeaf, dumbbell: IconDumbbell, brain: IconBrain,
  sun: IconSun, moon: IconMoon, droplet: IconDroplet, sparkle: IconSparkle,
  check: IconCheck, arrow: IconArrow, chevron: IconChevron, down: IconDown,
  menu: IconMenu, search: IconSearch, download: IconDownload, users: IconUsers,
  bookmark: IconBookmark, mail: IconMail, quote: IconQuote, calendar: IconCalendar,
  whatsapp: IconWhatsApp,
};
export function Icons({ name = 'heart', ...rest }) {
  const Cmp = ICON_MAP[name] || IconHeart;
  return <Cmp {...rest} />;
}
window.Icons = Icons;
