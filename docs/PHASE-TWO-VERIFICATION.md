# Phase two verification — 2026-11-06

## Actual execution
- 38/38 tests passed across managed Chromium and Firefox (19 cases per engine). Includes original suite, source/editorial guide, failed script/image, repeated filters, loaded-font 200% text, navigation focus and screenshot captures.
- Chromium visual regression: two reviewed Linux baselines captured, followed by separate comparison run: 2/2 passed. Baselines are author-approved current renders, not independent evidence of design quality; other OS/font rendering needs reviewed baselines.
- Author inspected actual final desktop/mobile program map, accreditation, guide and transparency text. Original graphic is optional; no fabricated campus photograph.
- Real bug regression: mobile link focus was lost during default hash navigation; explicit hash navigation and heading focus now pass on both engines.
- WOFF2 53868 bytes, original TTF 164700 bytes; only WOFF2 loaded. Small optional image 85850 bytes versus full WebP 266696.

## Mobile Lighthouse lab comparison
Same local system Chromium and installed Lighthouse, default mobile throttling, cold navigation. One run per version, not statistical or field measurement:
- Before: performance 100, accessibility 100, best practices 100, SEO 100; LCP about 1.0s; CLS 0.
- After: performance 100, accessibility 100, best practices 100, SEO 100; LCP about 1.1s; CLS 0; TBT 0ms.
- No performance-score increase claimed. Full JSON/HTML reports in reports/. No real-user INP or field Core Web Vitals claimed.

## Blockers and source boundaries
- Four upstream official program pages and attempted accreditation page return 403; archive recovery unsuccessful. Browser navigation confirms Cloudflare verification, not actual program content. No curriculum/accreditation claims extracted or fabricated. Academic text remains source-limited, with visible disclosure.
- WebKit downloaded but cannot launch: missing Ubuntu-targeted OS libraries on CachyOS. No system packages changed. Firefox/Chromium run successfully. No claim of Safari validation.
- Local GitHub Actions definition installs all three browsers/dependencies on Ubuntu, read-only contents permission, report upload only. Not pushed and not executed remotely; CI success unknown.
- No manual screen-reader or physical-device testing performed. Automated axe coverage is not certification.
- Upstream licenses/asset reuse permissions still need maintainer review.

## Local commands
`TEST_BROWSERS=chromium,firefox npm test`

`TEST_BROWSERS=chromium VISUAL_REGRESSION=1 npx playwright test tests/visual.spec.js`

`CHROMIUM_PATH=/usr/sbin/chromium node scripts/performance.mjs after`
