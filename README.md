# Ella Design System

**[→ Open the live website](https://ethaniloveyou.github.io/ella-design-system/)** — hosted on GitHub Pages
**[→ View the repo on GitHub](https://github.com/ethaniloveyou/ella-design-system)**

## Components

- **CommunityBanner** — invite banner for the community waitlist/CTA.
- **FeaturedIn** — press/media logo strip.
- **Footer** — 4-column site footer with newsletter signup.
- **Header** — sticky nav bar with logo, links, and language toggle.
- **Icons** — icon set, look up by name (`heart`, `leaf`, `arrow`, etc.).
- **InfoLinks** — 3-column "everything you need" quick-link grid.
- **Photo** — real photo or warm placeholder rectangle for image slots.
- **PromoBar** — rotating top-of-page announcement strip.
- **SvgAssets** — logo and illustration marks, look up by name.
- **Testimonials** — quote carousel.
- **AboutJessica** — founder story screen.
- **ArticleView** — single long-form article screen.
- **ArticlesHub** — article index/browse screen.
- **AskYourDoctor** — printable doctor-visit checklist screen.
- **AwarenessQuiz** — 5-question personalized check-in quiz.
- **Homepage** — full homepage screen (hero, pillars, quiz banner, testimonials).
- **HormonalTherapy** — hormone therapy options screen.
- **NutritionHub** — nutrition-focused article landing screen.
- **ReproductiveHealth** — reproductive health/screenings screen.
- **SupplementsHub** — supplements guide screen.

> A warm, editorial design language for **Ella** — a women's health platform centered around menopause and hormonal wellness.

---

## 1. Company context

**Ella** exists to help women understand their options at every hormonal stage of life. The platform provides easy access to nutrition, supplement, exercise, and mental-health resources so no woman feels confused or alone. The site is centered on menopause.

**Founder & expertise:** Jessica Zavala — Physician assistant, OB-GYN background, women's wellness certificate, years of personal research in women's health.

**Target audience**
- Women aged 45+
- Spanish-speaking women (English/Spanish toggle is a first-class feature)
- Often *not* highly tech-savvy — clarity, large type, and obvious navigation matter more than density

**What women should feel when they visit:** *Like they found a place.* One trusted site where they can gather everything they need.

### Content pillars
1. **Nutrition** — foods to include, protein needs during menopause, swaps. *No meal plans.*
2. **Supplements** — Omega-3, Vit D, Vit K, Collagen, Magnesium glycinate, Fiber. Includes affiliate-style links to buy.
3. **Exercise** — Strength training (even light weights), walking, yoga. Less cardio.
4. **Mental health** — Resource links, support groups, meetups. Acknowledges that depression/anxiety/suicide rates rise sharply post-45.
5. **Skin care** — Hormonal changes and skin.
6. **Hormonal therapy** — Explanations of options *only*, no endorsements.
7. **What to ask your doctor** — Printable / downloadable question list for OB-GYN appointments.
8. **Awareness / education section** — Possibly a quiz; possibly an article hub. Open-ended.
9. **Newsletter signup** — Lightweight email capture, homepage + footer.

### Homepage must-haves
- Large logo
- Awareness / education section
- Real photographs
- Resource links
- Supplement links
- Newsletter signup
- Language toggle (EN/ES)

---

## 2. Sources & provenance

> ⚠️ **No external sources were attached for this project.** No codebase, no Figma file, no existing brand kit, no slide decks were provided. Everything in this system was derived from Jessica's written brief.
>
> If you (Jessica) have any of the following, please drop them in via the Import menu so this system can be refined to match:
> - Existing logo or wordmark files
> - A specific brand color you have in mind (HEX / Pantone)
> - Preferred font files (or names of fonts you love)
> - Photography you already own / have licensed
> - A Figma file with any in-progress designs
> - Reference sites you admire ("make it feel like X")

---

## 3. Index of files

```
/
├── README.md                  ← you are here
├── SKILL.md                   ← entrypoint for Claude Code / agents
├── colors_and_type.css        ← all design tokens (colors, type, spacing, radii, shadows)
├── fonts/
│   └── fonts.css              ← @import wrappers for the typefaces in use
├── assets/
│   ├── logo-ella.svg          ← primary wordmark
│   ├── logo-mark.svg          ← icon-only mark
│   ├── illustration-*.svg     ← brand illustrations / motifs
│   └── icons/                 ← icon set (Lucide, copied locally)
├── preview/                   ← Design System tab cards
│   ├── type-display.html
│   ├── colors-primary.html
│   └── … (one HTML file per token cluster)
└── ui_kits/
    └── website/
        ├── README.md
        ├── index.html         ← interactive click-thru of the marketing site
        ├── Homepage.jsx
        ├── ArticlePage.jsx
        ├── AwarenessQuiz.jsx
        ├── AskYourDoctor.jsx
        └── components/        ← shared header, footer, buttons, cards, etc.
```

---

## 4. Content fundamentals

The voice is **a knowledgeable older sister, not a doctor lecturing from a clipboard.** Jessica's clinical credentials sit in the background; the front-of-house tone is warm, plainspoken, and supportive.

### Voice rules
- **Second person, always.** "You're not imagining it" — never "Patients sometimes report…"
- **Women supporting women.** Use "we" when speaking collectively about the experience ("we've all been told to push through"), "you" when speaking to the reader.
- **Plainspoken, not clinical.** Say *"hot flashes"* and *"the change"* alongside *"vasomotor symptoms"* — name the experience first, the term second. Define every medical word in the same breath you use it.
- **Validating, not alarming.** Mental-health content acknowledges the real risk (depression, anxiety, suicide rates post-45) without sensationalizing. Lead with "you are not alone," follow with resources.
- **Empowering, not prescriptive.** "Here are your options" — never "you should." Especially around HRT, supplements, and therapy.
- **No jargon-heavy CTAs.** Buttons say *"See foods to add"*, not *"Explore nutrition vertical"*.

### Casing & punctuation
- Sentence case for everything — headers, buttons, nav. (Title Case feels institutional and cold for this audience.)
- Em-dashes and commas over semicolons.
- Numbers spelled out under 10 (*"five symptoms"*), digits at 10+ (*"45+"*, *"1,200mg"*).
- Never ALL CAPS in body. Small-caps tracking only for the occasional eyebrow label.

### Emoji & ornament
- **No emoji** in product UI. The audience skews older and the brand reads more editorial than chatty.
- A small set of hand-drawn botanical ornaments (sprig, sun, wave, half-moon) can replace decorative emoji needs — see `assets/illustration-*.svg`.

### Bilingual considerations
- Every primary surface (homepage, nav, hero copy, CTAs, key articles) must have a Spanish translation. Spanish copy is **not a translation afterthought** — it's commissioned alongside English so idiom and warmth survive.
- The language toggle sits in the top-right of the global header and persists across navigation.
- Spanish runs ~15-20% longer than English — leave headline and button layouts breathing room.

### Example before/after

| Don't | Do |
|---|---|
| "Patients experiencing vasomotor symptoms may benefit from…" | "Hot flashes waking you up? You're not imagining it — here's what's actually happening." |
| "Explore our nutrition resources." | "See foods to add this week." |
| "Hormone Replacement Therapy: An Overview" | "What is HRT, really? Your options, in plain English." |
| "Sign up for our newsletter!" 🎉 | "Get the weekly note. Honest, useful, never spammy." |

---

## 5. Visual foundations

### 5.1 Aesthetic direction in one line
**Editorial wellness magazine, not medical app.** Think *Goop without the woo*, *The Cut crossed with a botanical apothecary*. Generous whitespace, large serif headlines, blush and clay neutrals, real photography of women aged 45-70 in natural light.

### 5.2 Color
The palette is rooted in three families:

- **Warm neutrals** — cream, sand, taupe. These dominate. ~70% of any layout is a neutral background.
- **Blush + clay** — soft pinks and a deeper terracotta-rose. The signature brand color is `--ella-rose` (a muted, dusty rose, *not* hot pink). Used for primary CTAs, brand accents, headline pull-outs.
- **Sage + plum** — supporting accents. Sage for "wellness / nutrition / nature" affordances; plum for "deeper / clinical / hormonal therapy" content.

Color is used sparingly and confidently. No gradients except very subtle warm-cream washes on hero sections. No neon, no jewel tones, no purple-pink hot palettes.

See `colors_and_type.css` for the full token list.

### 5.3 Typography
A two-family system:

- **Display:** *DM Serif Display* — a warm, slightly editorial serif with subtle ball terminals. Used for h1–h2 and pull quotes. Always at large sizes (≥36px) where the warmth reads. *(Flagged substitution — see §7.)*
- **Body:** *Nunito* — a rounded geometric sans-serif. Friendly, very readable at body sizes, especially for older eyes. Used for h3–h6, body, UI labels. *(Flagged substitution — see §7.)*

**Type scale anchored at 18px base** (not 16px) — the 45+ audience reads more comfortably at this size. All ratios scale up from there.

### 5.4 Spacing & layout
- **8pt grid** for component spacing.
- **Generous outer margins.** Marketing pages use a 1240px max content width with 80px gutters at desktop.
- **Tall vertical rhythm.** Section padding is 96-128px desktop / 64-80px mobile. The site should *breathe*, not feel packed.
- **Single column wherever possible.** Two-column body layouts are rare; reserved for sidebar-style content like "What to ask your doctor."

### 5.5 Backgrounds & imagery
- **Real photography is mandatory** for the homepage hero and article leads. Subjects: women 45-70, natural light, candid (not staged stock), warm color grading. Avoid: clinical white-coat imagery, hands-only stock, anyone obviously under 40.
- **Color grading:** warm, slightly desaturated. Skin tones intact, no heavy filters. A subtle cream/blush wash is acceptable.
- **Full-bleed hero photography** on the homepage. Editorial-style.
- **Background motifs:** very soft botanical line art (sprigs, half-moons, sun rays) at low opacity as decorative elements. Never busy patterns.
- **No grain, no gradient meshes, no glassmorphism.**

### 5.6 Animation
- **Restrained.** Fade-and-rise on scroll for editorial sections (12-16px translate, 400-600ms, ease-out).
- **No bounces, no spring physics, no parallax tricks.**
- **Hover transitions** are 150-200ms ease-out on color/opacity only.
- **Page transitions** are simple cross-fade (200ms). Nothing flashy.
- The audience is older — motion that feels playful to a 25-year-old feels disorienting here.

### 5.7 Hover & press states
- **Hover** — primary buttons darken ~8% in lightness; secondary/text links shift to `--ella-rose-deep` and gain a 1px underline at 2px offset; cards lift via a softer shadow swap (no transform).
- **Press** — buttons darken another 4% and shift 1px down (no scale). Links lose the underline animation briefly.
- **Focus** — 2px solid `--ella-rose` outline with 3px offset. Always visible — accessibility is non-negotiable for this audience.

### 5.8 Borders, shadows, elevation
- **Borders** — 1px solid `--ella-sand-200` for cards, dividers, form inputs. Never harsh black.
- **Shadows** — soft, low-spread, warm. Two tiers:
  - `--shadow-soft`: `0 1px 2px rgba(74, 47, 40, 0.04), 0 2px 8px rgba(74, 47, 40, 0.06)` — resting cards
  - `--shadow-lifted`: `0 4px 12px rgba(74, 47, 40, 0.08), 0 12px 32px rgba(74, 47, 40, 0.10)` — hover / modals
- **No inner shadows.** No neumorphism.
- **Protection gradients** over photography use a warm-cream-to-transparent linear gradient, not black-to-transparent.

### 5.9 Corner radii
- **12px** — standard cards, images, buttons (rectangular feel, not pill-y).
- **24px** — large hero containers and feature cards.
- **999px (pill)** — small chips, tags, the language toggle, and the rare CTA where extra warmth helps.
- **4px** — small UI: tooltips, badges.

### 5.10 Cards
The default Ella card:
- Cream-white background (`--ella-cream-50`)
- 1px solid `--ella-sand-200` border
- 12px radius
- `--shadow-soft` shadow
- 24-32px internal padding
- On hover: shadow lifts, no transform

### 5.11 Transparency & blur
- **No backdrop-blur in product UI.** Feels too iOS-app, wrong tonally.
- Transparent overlays only over hero photography: a 30-40% cream wash for headline legibility.

### 5.12 Layout rules
- **Header** is sticky, 80px tall, cream background with 1px bottom border on scroll.
- **Footer** is generous (240px+ tall), cream background, four columns, newsletter signup top-right.
- **Language toggle (EN/ES)** is always visible top-right of the header.
- **No floating widgets** — no chat bubbles, no scroll-to-top buttons, no popups (except a one-time newsletter modal, if any).

---

## 6. Iconography

See [ICONOGRAPHY](#7-iconography) section below for details.

---

## 7. Iconography

Ella uses a **single, consistent line-icon system**.

- **Set:** [Lucide](https://lucide.dev/) — 1.5px stroke, rounded line caps, 24px default size.
- **Why Lucide:** soft, friendly, the rounded caps match Nunito's geometry; large set covers content categories (heart, leaf, dumbbell, brain, sun, moon, droplet) and UI affordances (chevron, search, menu).
- **Color:** icons inherit `currentColor` and are typically rendered in `--ella-clay-700` or `--ella-rose` for accent.
- **Sizing:** 20px inline-with-text, 24px in buttons and nav, 32-40px for category tiles, 56-72px for hero feature blocks.
- **Stroke weight:** never alter — always 1.5px to stay consistent with the family.

### What's NOT used
- **No emoji** in product UI.
- **No filled / duotone icons** — line-only.
- **No unicode dingbats** as decoration. Use a real Lucide icon or a brand illustration.
- **No icon-only buttons without aria-labels** — accessibility for the target audience.

### Brand illustrations
A small set of hand-drawn-feel botanical line drawings live alongside icons for editorial decoration:
- `illustration-sprig.svg` — small leafy sprig, used as section ornament
- `illustration-sun.svg` — simple sun-rays motif, used for "morning routine" content
- `illustration-half-moon.svg` — used for "sleep" and "rest" content
- `illustration-wave.svg` — gentle wave divider between hero and body

These are simple line art at 1.5px stroke to harmonize with Lucide icons.

### Flagged substitutions
- **Logo (`assets/logo-ella.svg`)** — *placeholder*. A simple wordmark in DM Serif Display + a small sprig mark. Replace with the real Ella logo when one is designed/provided.
- **Photography** — *placeholders only* in the UI kit. The website's emotional weight rests on real, licensed photography of women 45-70. Stock-photo placeholders are illustrative only.
- **Fonts** — DM Serif Display + Nunito are Google Fonts substitutions chosen to match the warm-editorial-but-friendly direction. If Jessica has fonts she's licensed (e.g. Recoleta, GT Sectra, Söhne), swap them in.

---

## 8. Tweaks & overrides

The UI kit's `index.html` ships with a **Tweaks panel** exposing:
- Primary brand color (rose / clay / plum)
- Display typeface (serif / soft serif / soft sans)
- Hero layout variant
- Language (EN / ES)

So Jessica can play with directions live.
