# Ella Website UI Kit

An interactive click-thru prototype of the Ella marketing site. Run it by
opening `index.html` in a browser (or via the project preview).

## Screens

| Route          | File                              | Purpose |
|----------------|-----------------------------------|---------|
| `home`         | `screens/Homepage.jsx`            | Hero, awareness teaser, content pillars, doctor-checklist banner, founder quote |
| `quiz`         | `screens/AwarenessQuiz.jsx`       | 3-question "Where am I?" check-in with results & next reads |
| `article`      | `screens/NutritionArticle.jsx`    | Editorial article template — "Protein after 45" |
| `supplements`  | `screens/SupplementsHub.jsx`      | Six supplements with affiliate-style buy links |
| `doctor`       | `screens/AskYourDoctor.jsx`       | Printable doctor-visit checklist mock |

## Components

| File                          | What it is |
|-------------------------------|------------|
| `components/Header.jsx`       | Sticky header, primary nav, search, **EN/ES language toggle** |
| `components/Footer.jsx`       | Four-column footer with newsletter signup |
| `components/Photo.jsx`        | `<Photo>` placeholder for real photography slots |
| `components/Icons.jsx`        | Inline Lucide icon set |
| `components/i18n.jsx`         | `useT(lang)` hook and EN/ES dictionary |
| `tweaks-panel.jsx`            | Tweaks-panel scaffolding |

## Tweaks panel

Toggle "Tweaks" in the toolbar to open the Tweaks panel and play with:

- **Primary color** — 4 curated swatches (rose / deep rose / plum / sage)
- **Hero copy** — Default / Editorial / Soft
- **Botanical ornaments** — show/hide brand line-art around the hero
- **Display font** — DM Serif Display, Cormorant Garamond, Fraunces, Lora
- **Body font** — Nunito, Manrope, Inter
- **Language** — English / Español (the toggle in the header also flips this)
- **Jump-to-screen** — quick navigation between the 5 screens

## Notes & caveats

- **All photography is placeholder.** The `<Photo>` component renders a warm
  gradient with an abstract figure suggestion to mark where real licensed
  photographs of women 45-70 should go. The emotional weight of the real site
  rests on real photography — please license a small set before launch.
- **Logo is placeholder.** A simple sprig mark + DM Serif Display wordmark
  stands in for the future Ella logo.
- **Fonts are Google Fonts substitutions.** Real brand fonts (e.g. Recoleta,
  GT Sectra, Söhne) can be swapped in via `colors_and_type.css`.
- **Spanish copy** is included for every primary surface. In production it
  should be commissioned (not auto-translated) so warmth and idiom survive.
- The kit covers cosmetic UI only — actual form submission, newsletter
  signup, and PDF generation are stubbed.
