# Campus redesign implementation plan

> Execution: native in this session, user delegated design and technical choices. No publication.

**Goal:** a distinctive, accessible TI PNP introduction with a working program explorer and honest source boundaries.
**Architecture:** semantic single-page HTML, responsive CSS, progressively enhanced vanilla JS. All assets local; no runtime dependencies. Existing upstream URLs and historical accreditation values retained with disclaimers.
**Spec:** PRODUCT.md; approved scope in conversation (full redesign, HTML/CSS/JS, mobile/desktop tests, docs, no publication).

## Global constraints
- No invented institutional facts, statistics, accreditation dates or official endorsement.
- No new license, backend, tracking or dependency required to view the page.
- Reduced-motion and JavaScript-disabled users retain full content.

## Direction contract
THESIS: a blue academic prospectus with a live program index rather than a static institutional poster.
OWN-WORLD: deep blue/white, lime action accent, decisive sans-serif headings, an ordered full-width program list, solid fields and fine rules.
STORY: visitors understand the department, explore four existing programs and follow official program pages.
FIRST VIEWPORT: compact brand/nav, a large left-aligned headline and introductory text, with the actual degree-filtered program index directly below in the same blue field; no invented metrics.
FORM: candidate 6, academic open-day program board. Grounded alternatives considered: campus wayfinding, course catalog, faculty publication, admissions handbook, studio exhibition, open-day program board, learning atlas. seed:46add6e278666c87. Challengers declined on audience identification and clarity: jazz sleeve, kit wall, ASCII scene, VU bridge, brine calendar, sneaker wall. Retained discipline: strong color commitment, fixed identity, immediate interaction, consistent state, content organization, responsive ordering respectively. No costume motifs transferred.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Task 1 — content and explorer
- [ ] Create package.json and browser regression tests. Establish failures against upstream: lang, viewport, single h1, program filters, responsive overflow, menu keyboard handling, reduced-motion, no-JS, no initial video transfer, axe checks.
- [ ] Replace index.html and CSS; create script.js. Explorer uses hidden buttons until JS initializes, aria-pressed filter state, live result count, native details disclosures and unchanged official external URLs.
- [ ] Test and correct at 320, 390, 768, 1024, 1440 widths; 200% text; keyboard navigation, no JS and reduced motion.

## Task 2 — assets and playback
- [ ] Convert original graphic to local WebP, retain original sources. Preserve logo. Optional video uses preload=none, user activation and native controls, never autoplay.
- [ ] Verify video load behavior, media errors, meaningful image alternatives and failed-JS fallback.

## Task 3 — finish and contribution readiness
- [ ] Run browser tests and axe on main states, capture desktop/mobile and inspect actual images.
- [ ] Add README, CONTRIBUTING, asset/source provenance, DESIGN.md and a PR draft. Keep license absence explicit.
- [ ] Run final tests, diff check and source review; record actual limitations. Update DevBrain canonical project note and index, run devbrain-check. No fork, push, PR or deployment.

## Review focus
Small screens and enlarged text must not overflow; keyboard and Escape must work in mobile navigation; filtering must close hidden disclosures without losing usable state; failed/disabled JS must retain official links and playable media; motion preference must suppress decorative transitions.
