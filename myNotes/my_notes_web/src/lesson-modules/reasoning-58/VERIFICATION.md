# AoR 58 verification · 25 November 2026

Implemented EN/DE lesson `choosing-when-no-option-is-perfect` in Part Eight, fifteen native figures, three activities and a semantic course thumbnail. Original script and sixteen supplied screenshots are preserved privately with SHA-256 records and a section disposition ledger. No private originals or production instructions are published. Mathematical/editorial and German translation review remain **unreviewed**.

## Model and source checks

Node 24 standalone verifier passed in staging; the active verifier also passed in every production pipeline. It checks 7,236 probability / loss-weight / constraint configurations with independent integer weighted-total oracles; every payoff, probability of loss, feasible action set, both optimal ties and neighboring rankings, the dominated A/C crossing at 30%, the utility tie at 10%, fixed all-state constraint policy at endpoints, reliability trade-off, robust/sensitive intervals, finite bounds and invalid numeric input. It checks all manifest figures and presets in both lesson files, four reference exercises, matching display mathematics and exclusion of private/source artifacts. Active checks additionally render every figure in both languages, representative probability/constraint states, utility extrema, weather states and distribution endpoints; no nonfinite values, undefined markup or invalid accent tint is generated.

## Production builds

Locked integration passed. A subsequent locked update corrected utility chart units at loss weight 1, made finite numeric alternatives accept arbitrary in-bounds values, and kept live announcements concise. Its complete production build passed. A single process-owned lock then enclosed a full `/MyNotes` build with `SITE_URL=https://example.github.io`, an immutable prefix snapshot, the restored normal build and an immutable normal snapshot. All three final runtime pipelines reported:

- Astro diagnostics: 0 errors, 0 warnings (existing hints remain).
- Reusable library and all 31 registered module verifiers passed, including the new decision model.
- Existing content, preservation, mathematics, localization and module-workflow gates passed.
- 317 static pages, Pagefind search, 49,354 local links/assets and text contrast checks passed.
- 13,452 generated TeX annotations and shared dynamic/escaped-math checks passed.

Counts describe the complete checkout at that build, including concurrently integrated lessons. The normal build was restored. Shared registries, other lesson bundles and the shared preview lifecycle were left untouched. Verification documentation is packaged through the same locked update with the full normal build.

## Observed browser checks

Served the immutable normal/prefix snapshots on a task-owned local port; browser checks used actual native/DOM controls. The server is stopped after review, and no routine browser tab is retained.

- English/German × dark/light × 1280×844 and 390×844: all eight combinations had fifteen figures, three activities and zero KaTeX errors. Page widths were 1269 and 379 px respectively, within the viewport; no page-wide overflow. Activity buttons measured 47.59 px high. Visual review covered the desktop venue drawings and compact localized controls/plots.
- Numeric probability entry committed with native keyboard input visibly produced A/B tie at 25%, B/C tie at 37.5%, and B alone at 30%. Range Home/End and ArrowRight updated state; focused range retained focus at 20.5%.
- All four constraint modes changed feasible rows and reported winners. With both constraints, B remained feasible at 0% (420 euros) and 100% (−60 euros), as specified by the all-state policy. At 100%, budget-only selected B and loss-only selected C.
- Blank and 101% numeric entries showed inline alerts, preserved the last valid result and exposed `aria-invalid`. Reset cleared errors, restored 20% and removed constraints. German invalid feedback and German reset/filter results were also observed.
- Utility weights 1, 3 and 5 displayed expected utility vectors (360,324,240), (120,300,240) and (−120,276,240); expected money stayed (360,324,240). Reset restored source weight 3. Utility units remain distinct from euros even when numerical values coincide.
- Pointer/native-select weather change produced rainy payoffs (−600,−60,+240). Native keyboard Down/Return on the gallery's independent select visibly changed its weather. Enter reset restored only that instance; the other stayed rainy.
- Gallery contained all fifteen figures, all three activities and a second independent weather activity. Observed separate values and independent reset confirmed local state isolation.
- The 640 px plot lived in a 303 px focusable compact scroll region; ArrowRight moved its local horizontal scroll position from 0 to 40 px. Page width remained bounded. Four reference answers use the existing native disclosures; the final German answer, including the utility tie reasoning, was opened and read.
- Course overview included the order-58 route with one semantic SVG preview. Part Eight sidebar, predecessor 57 and successor 59 links were observed. Equivalent language links retained the lesson and `/MyNotes` prefix.
- English and German Pagefind queries each returned the lesson and opened the correct localized route under both the normal root and `/MyNotes` prefix. Browser console error log was empty.

Evidence: `previews/reasoning-58-browser-audit.json`, `previews/reasoning-58-desktop-en-dark.jpg`, `previews/reasoning-58-compact-de-dark.jpg`, and `previews/reasoning-58-compact-de-plot.jpg`.

These checks verify implementation behavior and numerical examples, not an empirical forecast, measured preferences, philosophical consensus or human translation review. No commit, push or deployment was performed.
