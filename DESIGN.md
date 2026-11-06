---
mode: persuade
status: implemented
---
# TI PNP visual system

Solid institutional blue prospectus, light reading surfaces and a lime action color. Designed for prospective students browsing daylight mobile and desktop screens. Native program disclosures are the signature interaction, with an honest academic source boundary.

## Tokens
- Blue `#183bb5`, deep `#102969`, ink `#142543`, secondary `#51617a`, lime `#d8f879`, paper `#ffffff`, pale `#f0f4fa`, rule `#d4ddeb`.
- Locally served Manrope variable, Arial/system sans fallback. Body 14–16px, program titles 19–32px, h2 32–48px, hero 40–72px. Small labels/captions 12px, nav/actions 13px. Font weights 500/600/700/800.
- Main content max-width 1200px; gutters 48px desktop, 32px intermediate, 20px mobile. Section spacing 56–112px. No decorative shadows or gradient text.
- Breakpoints 1100, 800, 480px. At <=800px content stacks, nav becomes an expandable region only with JS; at <=480px degree filters move under their heading.

## Components and behavior
- Logo preserved from upstream, not recreated. TI favicon is an authored navigation convenience, not official institutional branding.
- Program list is `<details>` / `<summary>`; full-row action, highlighted expanded surface, plus rotates into close mark. All programs remain reachable without JS.
- Filter uses pressed buttons, visible active surface, and polite count announcement. Filtering closes hidden disclosures.
- Mobile nav has aria-expanded, Escape focus return and close on destination selection. Navigation remains available without JS.
- Focus ring: blue on light, lime on dark. Selection: lime/deep blue. Reduced motion disables smooth scroll and transitions.
- Video is opt-in, native controlled, muted and preload none, with a sourced poster and download fallback.
- Attribution: `assets/SOURCES.md`. Historic accreditation disclaimer stays adjacent to table; no official endorsement claims.

## Review evidence and limits
Author review of actual desktop/mobile renders, program/menu interaction and table/video/footer. Playwright plus axe tests are recorded in docs/VERIFICATION.md. No independent reviewer tool, no Safari/Firefox/physical-device certification. Detector's cascade warnings must be distinguished from actual rendered contrast checks; do not present a static detector warning as an axe failure.
