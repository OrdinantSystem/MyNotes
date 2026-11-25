# AoR 46 verification

Completed 25 November 2026 with Node 24.22.1. Review status remains unreviewed; automated and browser checks do not establish expert mathematical, historical or translation review.

## Production and source checks

- Preserved original text and SHA-256/private coverage ledger. Inspected Snow’s original Tables I and IX facsimiles and accompanying text; public-domain map attribution is visible.
- Pure module verifier passed all 101 integer alternative scores, signs/extrema, fixed observed before/after scores and all three alternative trajectories; exact historical counts and calendar-gap segmentation; reported/recomputed rates and ratios; exposure-versus-proximity counterexample; all four comparison choices; bilingual markup, singular/plural units, source/privacy and component completeness.
- `npm run lesson:integrate -- lesson-work/reasoning-46` passed the full locked production pipeline. Subsequent `lesson:update` runs passed after the SVG polyline correction, timeline legend, singular point wording and fatal-attack source clarification.
- Required literal `SITE_URL=https://ordinantsystem.github.io BASE_PATH=/MyNotes npm run build` passed. The final corrected prefix and restored normal builds also passed the identical full pipeline, with immutable snapshots copied and verified while holding the same shared build lock. This avoids a concurrent session replacing dist between a build and preview copy. Temporary orchestration was local to this task; shared scripts were not changed.
- Final normal build: 295 static pages, 40,842 local links/assets and 12,726 TeX annotations checked; library/module checks, content preservation, navigation, localized counterparts, Pagefind and contrast passed. Astro had zero errors and zero warnings; existing hints were outside reasoning-46.

## Browser checks

- Final EN/DE routes: `/reasoning/lessons/what-would-have-happened-otherwise/` and `/de/reasoning/lessons/what-would-have-happened-otherwise/`.
- All eight language × 1365/390px × light/dark combinations passed: thirteen figures and four activities, no page-wide overflow, no SVG text outside its view box. Wide figures/tables scroll locally. Keyboard panning of the compact plot was observed (303px region / 580px drawing).
- Slider and numeric input checked at 65,85,95,0,100; keyboard Home/ArrowRight and End, invalid 101, and Reset. Results remained +20,0,−10,+85,−15 with fixed observed 85. Final rendered +1 point / −1 Punkt wording checked.
- Timeline growth/stable/decline gave +5/+25/+45 with fixed observed change +25. Exposure toggle revealed the nine assigned water links and Reset restored geography. All school choices produced specific reasoning; Reset cleared selection. Reference solution disclosure opened.
- Gallery first activity and independent instance stayed isolated: changing the first to 100 left the second at 70, and resetting the second left the first unchanged. All four presets and thirteen figures registered automatically.
- Historical map loaded. The two outbreak polylines have computed fill `none`; separate calendar segments preserve the gap from day 3 to day 8. The visible final caption distinguishes fatal attacks by onset from all illnesses and deaths by death date. German SVG text overlap check found no collisions.
- Header language switch, active Part Six navigation and previous/next links observed. Normal EN/DE Pagefind results opened the lesson. Final `/MyNotes/` preview language links, map asset and localized search results retained the prefix; no root-relative anchor escaped it. English prefixed search also returned the correct route.
- No browser console errors observed. Viewport override reset after QA. Normal immutable preview remains running at http://127.0.0.1:4446/ ; only this task’s prefix server was stopped. Other sessions’ preview servers were left alone.

## Evidence and limits

Evidence: `previews/reasoning-46-layout-audit.json`, `previews/reasoning-46-interaction-audit.json`, `previews/reasoning-46-desktop-en-light.jpg`, `previews/reasoning-46-mobile-de-light.jpg` and the score activity screenshot. The layout audit is from the final build. Detailed logs are local temporary files for this task.

The historical printed-rate discrepancy is disclosed rather than silently repaired or assigned an unsupported cause. Educational scores, alternative histories, exposure network and brewery buildings are explicitly illustrative. No individual study-method effect, exact pump-closure effect or expert review is claimed. No commit, push or deployment was performed. Only this episode’s module, staging/private source records and uniquely named preview evidence were authored.
