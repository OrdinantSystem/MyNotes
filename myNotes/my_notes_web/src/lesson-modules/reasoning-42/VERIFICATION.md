# AoR 42 verification · 25 November 2026

Implemented `what-are-you-actually-measuring` in EN/DE in Part Six / Teil Sechs, with sixteen native figures, three local activities, source-exact learner values and private provenance. Mathematical/editorial and translation status remain unreviewed; checks do not validate the proposed educational assessment system.

## Production checks

Node 24.22.1. Locked integration and the corrective update passed the full production pipeline: Astro diagnostics, library/model checks, content/source contracts, static generation, Pagefind, output/link/asset/contrast checks and mathematical rendering. The first integration found an extensionless import in the Node renderer check; rollback restored the preceding build, and explicit .ts imports corrected it. No check was bypassed.

The corrected source then passed full builds under both `/MyNotes/` with SITE_URL=https://example.github.io and the restored normal `/` configuration. These ran through the same process-owned lock and complete buildPipeline; immutable snapshots were copied while holding that lock. Both builds reported 0 errors, 0 warnings, 285 static pages, 36,589 local links/assets, 198 indexed pages, 15 registered modules, and 12,545 checked generated math annotations. Counts include concurrently integrated lessons and are observations of those builds, not fixed course requirements.

Model verification checks the exact twelve learner values, stable rankings and A/C competition tie, independent returned objects, 66,430 finite sorting input/output pairs against a separate numeric-sort oracle, multiset/duplicate preservation, empty lists and invalid nonfinite values, all 32 context/indicator combinations, all source passing tests, target centroids/scatter, and even/odd square identities for 201 integer parameter values including zero and negatives. Active verification renders every figure and activity branch in both languages and checks source/representation coverage and private-path exclusion.

## Browser evidence

Audited immutable snapshots in a background in-app browser. `previews/reasoning-42-browser-audit.json` records the eight combinations EN/DE × light/dark × 1280/390 px. Every combination has sixteen figures, three activities and no KaTeX errors. Page scroll widths were 1269/379 px respectively, within the viewport; activity buttons measured at least 47.59 px high. Wide schematic charts use a labeled local scroll region. The opened German parity reference proof also caused no page overflow.

Checked:

- Source ranking values and changed leaders; transfer B/C/A, delayed recall C/B/A, completion A/C tie. Native macOS select keyboard operation (Space, arrow, Return) updates the ranking and retains control focus. Closed native popup arrows alone do not commit a selection.
- Hypothetical sorting order failure, correct output and dropped duplicate; deliberate inspection, changed-case hiding, reset, and the requirement for an actual admissible counterexample. Resetting sorting leaves ranking state intact.
- Empty plan disables evaluation; pointer and keyboard checkbox/button operation; repair/support feedback, omitted evidence and incentives; all-selected explicitly remains unvalidated; changed selection/context clears stale evaluation; local reset clears choices.
- Gallery contains all sixteen figures, all three presets and an independent ranking instance. Changing or resetting one instance leaves the other unchanged.
- Course overview includes lesson 42 and its native SVG thumbnail; Part Six navigation and neighboring lessons remain registered.
- Normal English and German Pagefind queries (`construct underrepresentation`, `Konstruktunterrepräsentation`) return and navigate to the localized lesson. `/MyNotes/` home/search links, EN→DE equivalent lesson link and German search navigation preserve the prefix.
- No browser console errors in the final audit. Viewport override restored.

Screenshots: `previews/reasoning-42-desktop-en-dark.jpg`, `previews/reasoning-42-compact-de-dark.jpg`. Browser-serving ports 4542 and 4543 were task-owned immutable previews; the shared preview and other sessions were not stopped or refreshed.

## Source and interpretation boundaries

Original script and sixteen visuals, SHA-256 hashes and section dispositions are preserved privately. Production timestamps, editorial ratings, citation artifacts and animation instructions are not public lesson text. Native static relationships and bounded controls replace video choreography. Canonical tokens replace the source's amber. Full reference proofs, repair/support practice contexts, the duplicate-loss test and schematic plot coordinates are identified as additions.

All numerical course/learner examples remain fictional. Retention curve coordinates do not purport to calculate the dashboard's 94% value. The target analogy does not equate physical calibration with abstract construct validity. Incentive divergence is possible, not inevitable. No numerical mastery score, network submission, persistent answer storage, timer or actual sorting algorithm is introduced. No commit, push or deployment was performed.
