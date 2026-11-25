# Episode 44 verification

Implementation date: 25 November 2026. Both locale files retain `reviewStatus: unreviewed`. No mathematical, editorial or native-language expert review is claimed. No commit, push or deployment was performed.

## Completed checks

- Node 24.22.1 focused verifier passed in staging and in the production library pipeline. Two thousand seeded shuffles conserve all 60 identities, preparation levels, totals and 30/30 group sizes; 312 have at least one preparation count differing by four or more from ten. Expected group compositions approach 10/10/10 without forced balancing or rejection. Invalid random draws are rejected.
- Fixed fictional scores remain 68/84 with a difference of 16 percentage points. Protocol time/support changes do not manufacture new outcomes. Adherence keeps assignment 50/50 while received methods are 55/45; separate attrition counts are 46/50 and 35/50.
- Known-score removal changes the observed mean from 70 to 82.5 for six of ten while preserving each remaining score. Schematics distinguish greater uncertainty crossing zero from a narrower positive interval around the same +4 estimate; no calculated confidence level is claimed.
- Both locales contain all 15 figures and four activities, five question components, six workshop reference answers and seven final safeguards. Rendering checks reject undefined/nonfinite readouts and preserve escaped copy and instance-local SVG fragment ids.
- Locked integration passed: type diagnostics, module and library checks, localization/equation parity, navigation, source exclusion, generated links/assets, Pagefind and contrast. The build verified 287 static pages, 37,422 local links/assets and 12,553 generated TeX annotations. Counts include concurrent modules present at that snapshot, not only this lesson.
- Isolated normal snapshot on port 18644 served both localized routes. Browser checked EN/DE × light/dark × 1440×1000 and 390×844, with no page-wide overflow and no KaTeX errors. Wide diagrams scroll locally; compact group panels stack.
- Pointer and Enter/Space operation verified: randomize/repeat/self-selection/reset; partial and complete protocol repair; remove/restore observations with localized 82.5% / 82,5% feedback; individual workshop disclosure, reveal all six, close/reset. Controls remain focused after updates. Original 68/84 readouts stay fixed.
- Gallery check: changing the first assignment instance leaves the independent instance at 20/10/0 versus 0/10/20, with its self-selection button pressed. No duplicate lesson-44 ids were found.
- Production search: English `experiment` and German `Zuweisung` both return the correct localized lesson. Console error/warning log was empty during the inspected flows. Previous navigation points to the real episode 43.
- Evidence: `previews/reasoning-44-desktop.jpg`, `previews/reasoning-44-mobile-de.jpg`; the browser audit JSON will record final prefix checks.

## Prefix / restoration

Three `/MyNotes` production builds passed all checks. In the first two attempts, another normal build replaced the shared dist before the preview snapshot could acquire the lock. The isolated-preview validator rejected mismatched base paths and removed only those invalid candidate snapshots; existing previews remained live. The third attempt captured and verified a correct immutable prefix snapshot on port 18645.

Browser checks on that snapshot passed: German compact layout without page overflow, `/MyNotes/_astro/` module script, equivalent-language and lesson links retaining the prefix, localized missing-outcome feedback (82,5%), English keyboard random assignment, and production Pagefind results for English `experiment` and German `Zuweisung` pointing to the matching prefixed locale routes. Console errors/warnings were empty in the inspected flows. Prefix preview was stopped after checks.

The final default-configuration `npm run build` passed with 295 static pages, 40,842 local links/assets and 12,726 generated TeX annotations. Shared dist was restored to the normal base. Port 18644 keeps the original verified normal immutable snapshot live; lesson 44 source/rendered behavior is unchanged between it and the final build. The final browser returned to the normal English lesson, with 15 figures and four activities, and its temporary viewport override was reset.

`previews/reasoning-44-browser-audit.json` records the eight locale/theme/width layouts, activity and instance-isolation checks, normal/prefixed search and prefix controls. Screenshots show the desktop opening comparison and German compact missing-outcome activity. These checks validate implementation behavior, not empirical claims or expert review.
