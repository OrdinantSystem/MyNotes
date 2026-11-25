# AoR 40 verification · 25 November 2026

## Production and ownership

Node 24.22.1; existing locked dependencies reused. Activated through `lesson:integrate` and refined through `lesson:update`, both under the cooperative build lock with rollback protection. The complete production pipeline passed after final changes: Astro diagnostics, library/module/content checks, static generation, bilingual Pagefind, generated links/assets/anchors, mathematical annotations and both-theme contrast checks.

Final normal and repository-prefix (`SITE_URL=https://ordinantsystem.github.io BASE_PATH=/MyNotes`) pipelines passed. At this checkpoint the combined site has 279 static pages, 34,389 verified local links/assets and 12,367 TeX annotations, including independent work by the other lanes.

A first attempt to snapshot a prefix build was correctly rejected: another session had completed a normal build before the snapshot acquired the lock. No invalid preview replaced an existing one. A temporary, lesson-specific helper in /tmp then ran the existing buildPipeline and snapshot validation inside one withBuildLock critical section, followed by serving that immutable snapshot. The same process restored a normal build and normal immutable preview. No shared workflow source was edited. Final QA ports: 4441 for /MyNotes, 4440 for normal routes. The shared preview and other sessions' servers were not stopped.

Only reasoning-40's module/staging bundle, private provenance and uniquely named previews are owned here. No shared dispatcher, navigation/schema/source registry, package or other lesson was edited.

## Focused arithmetic and rendering

`verify.mjs` passes 429,471 combinations: every integer group count 80–100, hundredth-sized average 2.50–3.00 and capacity 0–400. It checks that the whole-chair ceiling is minimal, capacity comparison agrees with that ceiling, spare/shortage balance, monotonicity, invalid inputs and independent defaults. The exact-boundary regression 80 × 2.85 requires 228 chairs, with no spurious extra chair.

All 401 capacity domains are compared against independently classified corner scenarios. Hyperbola points satisfy G × S = C within tolerance and remain within the plotted domain, including empty and degenerate intersections. Product/quotient extrema, journey values over the input grid and information-improvement widths pass: 60 minutes originally, 260/7 ≈ 37.14 with exact distance, 22.5 with exact speed. Target centroids/scatter support the intended four analogies; nine of the ten schematic intervals contain zero. This is explicitly not a simulated 95% coverage result. All fifteen figure renders and activity output boundaries pass in EN/DE.

## Browser evidence

The final prefixed snapshot was reviewed at 390×844 and 1365×900, both languages and both themes: all eight combinations contain fifteen figures and three activities, with no viewport overflow and all native input fields within the viewport. Wide charts and the scenario matrix use local focusable scroll regions. The compact German target diagram and desktop German controls were visually inspected and captured. The final restored normal page was reopened for the delivery screenshot.

Observed behavior:

- Opening evidence reveal and reset; the two gallery opening instances retain independent disclosure state.
- Attendance range and number inputs, pointer movement, keyboard Home/End, reset to 90 / 2.8 / 260, capacity endpoints 0 and 400, rejection of invalid capacity 401 while preserving the last valid model.
- Exactly 260 projected attendees fit 260 chairs. At 261 there is a one-chair shortage. The final German wording reports “1 Stuhl fehlt.”
- At 80 groups and average 2.85, 228 chairs are sufficient. This also passes the independent whole-chair minimality check.
- Zero capacity renders an all-shortage plot and the explicit outside-domain boundary caption. Finite graph output is verified across endpoint scenarios.
- Journey select/reset correctly switches original, exact-distance and exact-speed assumptions. Rounded non-terminating endpoint/width displays are marked approximate; German numeric formatting is localized.
- The ordinary reference-solution disclosure opens and contains the quotient reasoning.
- English production Pagefind query `precision` finds lesson 40. German prefixed query `Präzision` finds `/MyNotes/de/reasoning/lessons/how-precise-should-your-answer-be/`.
- No browser console errors observed during the audit.

Screenshots and machine-readable matrix receipt: previews/reasoning-40-*. These are visual/behavior checks, not human translation review or assistive-technology certification.

## Source and review boundaries

The supplied substantive teaching argument and four preparation sources are preserved in bilingual learner-facing form. Production directions, pacing and promotional ratings are not user instructions or public lesson content. Source examples and assumptions are identified as hypothetical. The attendance range is not assigned a probability; confidence-interval interpretation remains conditional on its generating procedure. Robustness is scoped to the assumed range/objective, not optimality or every possible outcome. Private original/checksum/provenance stay outside public output.

Review status remains unreviewed. No commit, push or deployment performed.
