# Phase-one verification — 2026-11-06

Historical phase-one scope below. Current phase-two execution and limitations: [PHASE-TWO-VERIFICATION.md](PHASE-TWO-VERIFICATION.md). Browser configuration and displayed program graphic treatment changed in phase two.

## Executed
- Browser suite: 11 passed, 0 failed, 0 skipped, 0 flaky. Real system Chromium, Playwright. Final suite duration ~7 seconds.
- Five responsive widths: 320, 390, 768, 1024, 1440px, with disclosure expanded.
- Filter D3/D4/all, native disclosures, mobile keyboard/Enter/Escape and destination close.
- JavaScript disabled: full program list, links, navigation and disclosures remain usable.
- Reduced-motion + 200% root text at 390px: no document overflow. Regression found in intrinsic grid/font sizing and fixed with min-width:0 and emergency text wrapping.
- Axe WCAG 2 A/AA and 2.1 AA scan: no violations in desktop and expanded mobile test states. This is automated coverage, not certification.
- Native video playback exercised: paused=false, duration=10.30966, muted=true. Initial-load test confirms zero MP4 requests; source has preload none and no autoplay.
- Prettier check passed on HTML, CSS, JS, browser config and tests; git diff --check passed; npm audit --omit=dev: zero vulnerabilities.
- Author visually inspected actual desktop/mobile captures and lower table/video/footer. No fresh subagent reviewer capability available.
- Original graphic 308969 bytes; full-frame WebP 266696 bytes (13.7% smaller). Original retained.

## Detector review
Impeccable mechanical scan ran. Its reported dark-surface/hover contrast combinations do not reflect inherited rendered blue-section colors; rendered axe checks passed. Small 10px brand subtitle finding corrected to 12px. Closing-region inset warning reviewed: real content uses responsive wrap gutters and 64/48px vertical padding, not flush content. No claim of a warning-free detector run.

## Remaining boundaries
- Safari, Firefox, real physical mobile hardware, manual screen-reader and external-link destination checks not performed.
- Historical accreditation values are explicitly unverified; no current validity dates claimed.
- Maintainer must approve reuse/publication rights for upstream imagery/video and verify academic data. No upstream code license added.
- Source logo and legacy graphic have small embedded lettering; preserved for provenance rather than falsely recreated.
- No fork, push, PR, deployment, or persistent service created. Branch remains local.
