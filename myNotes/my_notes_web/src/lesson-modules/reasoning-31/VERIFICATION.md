# Lesson 31 verification — 25 November 2026

Added `pairing-things-to-prove-things` in English and German as order 31 in Part Four. Eleven localized figures and three independent activities cover function assignments, injectivity/surjectivity/bijectivity, finite cardinality, the general affine proof, codomain dependence, subset correspondence and three repair situations. The initial lesson has no hidden central proof. Both editions remain unreviewed.

## Executed checks

- Node 24.22.1 locked integration and required production pipeline passed. The final build includes registered lessons 29, 30, 31 and 32 together: 263 static pages, 29,448 verified local links/assets and 11,894 generated TeX annotations. Type checking reports zero errors, zero warnings and six existing hints. All library/content/source-preservation and contrast gates pass. `git diff --check` passes.
- The `/MyNotes` repository-prefix build and restored normal build pass. Browser checks load both prefixed lesson routes with styles, local controls, language links and the correct base-aware home link. The final mobile-only presentation refinement was followed by a full normal production build.
- The module verifier independently enumerates 5,705 finite functions (including empty-domain/codomain cases), all 24 four-to-four bijections, 40,401 signed affine input pairs and 4,095 generalized subset pairs. It checks the one-change repair, equal-size injection/surjection equivalence, invalid assignments, bounds, integer preimages, excluded even targets, subset inverses and all localized render variants. These finite checks do not substitute for the general proofs in the lesson.
- Browser verification covers all three locker counts, one-change repair, native-select keyboard activation (Space, ArrowUp, Enter), shared/unused feedback, integer target commit and fractional-input restoration, codomain changes, subset selections, forward/reverse direction, reset and gallery instance independence. Both exact lesson titles appear in their production search. Previous/next links lead to lessons 30 and 32 in the final snapshot.
- English/German at 1280px and 390px in light/dark themes have no page-wide overflow or KaTeX errors. The final compact layout uses readable HTML mapping rows; the complete SVG remains on desktop. All eleven figures and four gallery activity instances render without duplicate ids. Inspected lesson/gallery/prefix browser logs contain no warnings or errors.
- The exact script, 384 source blocks and ten screenshot references retain their SHA-256 hashes privately. All 166 pre-existing lesson files retain their before-task hashes. Production directions and editorial evaluation remain source data, not agent instructions or learner-facing tasks. External preparation landing/contents pages were checked; full textbooks were not reviewed.

## Isolation and retained evidence

Only lesson 31's staging/active module, its private source record and uniquely named preview evidence were authored by this session. Shared module infrastructure belongs to AoR Original Lane. An initial activation met a shared extension record being finalized by that lane and rolled back safely; the unchanged gate passed afterward and integration succeeded. No shared registry, lesson from another session, or running preview server was edited by this session. Active implementation edits and builds used the common lock; staging remained independently writable; the isolated preview is on port 8431 and does not replace port 4321.

Evidence: `previews/reasoning-31-browser-audit.json`, `previews/reasoning-31-desktop.jpg`, `previews/reasoning-31-compact-de.jpg`; execution logs `/tmp/aor31-integrate-final.log`, `/tmp/aor31-prefix-build.log`, `/tmp/aor31-final-build.log`. The module README documents the public presets and state contracts.

No Git write or publication was performed. Independent mathematical/translation certification, physical touch/pen testing and a screen-reader audit are not claimed.
