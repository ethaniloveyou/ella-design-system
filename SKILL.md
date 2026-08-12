---
name: ella-design
description: Use this skill to generate well-branded interfaces and assets for Ella, either for production or throwaway prototypes/mocks/etc. Ella is a women's health platform centered on menopause. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

# Ella Design Skill

Ella is a women's health platform centered on menopause and hormonal wellness, founded by physician assistant **Jessica Zavala**. The audience is women aged 45+, often Spanish-speaking, often not deeply tech-savvy — clarity, large type, and obvious navigation matter.

The voice is **a knowledgeable older sister, not a doctor lecturing from a clipboard.** Warm, plainspoken, validating. Name the experience before the medical term ("hot flashes" before "vasomotor symptoms"). No emoji. EN/ES bilingual everywhere.

## Where to start

1. Read **`README.md`** — full brand context, content fundamentals, visual foundations, iconography.
2. Read **`colors_and_type.css`** — the single source of truth for tokens (colors, type, spacing, radii, shadows). Import it into any new HTML file.
3. Browse **`preview/*.html`** for visual specimens (type, color, components).
4. Browse **`ui_kits/website/`** for the marketing site UI kit — Header, Footer, Buttons, language toggle, Hero, Pillar cards, Article, Quiz, Doctor checklist. Copy components from `ui_kits/website/components/` and `ui_kits/website/screens/` as starting points.
5. Brand assets live in **`assets/`** — logo, sprig mark, botanical illustrations.

## When to use what

- **Production code / mocks / prototypes** — import `colors_and_type.css`, copy components from `ui_kits/website/`, use Lucide icons (1.5px stroke, rounded caps).
- **Throwaway HTML artifacts** — same as above, but you can inline-copy whatever you need.
- **Slides / decks / marketing copy** — match the editorial tone, use DM Serif Display for headlines, real photography (or `<Photo>` placeholder) for emotional weight, generous whitespace.

## Hard rules

- **No emoji** in product UI.
- **No hot pink** — Ella's brand color is `--ella-rose` (#c87f6e), a dusty muted rose.
- **No purple-blue gradients, no neumorphism, no glassmorphism, no busy patterns.**
- **Base type is 18px**, not 16. The audience is 45+.
- **Generous vertical rhythm** — sections 96-128px, never cramped.
- **Always include the EN/ES language toggle** in the header on any marketing surface.
- **HRT content explains options only** — never endorses.
- **Mental health content acknowledges the real risk** (depression/anxiety/suicide rates rise post-45) without sensationalizing.

## Default behavior when invoked

If the user invokes this skill without other guidance, ask them what they want to build (slide, landing page, article template, email, etc.), ask a few questions about audience and language (EN/ES/both), and act as an expert designer outputting HTML artifacts or production code.
