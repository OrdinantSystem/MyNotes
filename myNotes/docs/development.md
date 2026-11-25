# Development and verification

Run commands in ../my_notes_web/ with Node 24 and the committed lockfile. No private API, external service, or machine-specific path is required to build.

## Standard change workflow

1. Read AGENTS.md, the design system, and the relevant guide/source.
2. Make the smallest coherent source change. Reuse tokens, layouts, MDX components, models, and presets.
3. Recalculate affected mathematics independently and check conditions/source meaning.
4. Run npm run build. For fast iteration on model work, npm run verify:library is available, but does not replace the production build.
5. Inspect changed flows using the production preview. Check pointer and keyboard/numeric controls, reset, feedback, overflow, affected languages, and themes proportionate to the change.
6. If routes/localization changed, build with SITE_URL and BASE_PATH as shown in the application README; serve using the same prefix. Check a localized lesson, language switching, and search-result links. Restore a root build/preview for normal use.
7. Update documentation/contracts and VERIFICATION.md. Report actual checks and remaining limits. Commit/push/publish only when requested.

## Build contract

The local preview serves a validated copy of the completed build, through `scripts/preview.mjs`, rather than the `dist/` directory that Astro clears during rebuilds. This prevents temporary 404s when a build is incomplete. `npm run preview` copies output into an ignored `.preview-dist-*` directory and runs the existing generated-output verifier against that exact copy before stopping the current preview. `MYNOTES_VERIFY_DIR` selects this validation directory; the normal build still checks `dist/`. Prefix configuration must match. If validation fails, the old preview stays live. Rerun preview after a successful build to refresh it; use `npm run preview -- stop|status|logs` for lifecycle commands. Snapshot directories must remain while their server is active and are never publication sources.

npm run build runs Astro diagnostics, verify:library, static generation, Pagefind, worksheet arithmetic/word checks (verify:content), and scripts/verify.mjs. Analysis checks derive matching localized inventories rather than assuming 15 lessons. The Analysis 0 check reconciles all 52 source dispositions and 28 concept mappings, preserves original keys through canonical pages or compatibility routes, and tests finite quantifier models including empty domains and numerical boundary examples; it is not proof or translation certification. Presets are validated both in the library check and when initialized by the Astro view. Equation parity treats digit-surrounded TeX decimal commas and decimal points as equivalent, so EN/DE numerical notation may be localized without weakening comparison of values.

The organization check additionally protects the 106 archived original MDX versions for supported languages (the complete 159-file historical archive remains frozen), every source-section disposition, prose/markup paragraphs with explicit duplicate allowances, exercises/solutions, hints/readings and tables. Test old page URLs and heading fragments as well as canonical routes. Compatibility documents are not lessons or search entries.

The Reasoning extension validates full current shared-source hashes and exactly reconstructs the preceding Analysis presentation dependencies before their frozen review checks run; unrecorded source changes fail. See [reasoning.md](reasoning.md).

Generated-output checks derive published lesson counts plus compatibility documents, enforce localized counterparts, verify links/assets/anchors, check private source exclusion, and explicitly count text-contrast pairs so formatting cannot silently disable checks.

Use relevant tests for actual risks: target reachability on a finite grid, singular/zero states, input bounds, inverse mappings, state isolation between instances, matrix dimensions, dynamic equation validity, and unsafe SVG labels. Do not add tests that merely reproduce prose or implementation structure.

## Navigation, routes, and search

- Publish matching EN/DE filenames together. Titles can differ; filenames are stable translation keys.
- Extend chapters/groups in src/lib/navigation.ts when adding a published order. Membership is checked exactly once per published lesson; a new lesson cannot disappear silently from the menu.
- Use url(), localeUrl(), and lessonUrl() from src/lib/content.ts. Never concatenate /myNotes or a locale directly into an application link.
- Search uses separate Pagefind language indexes. It does not translate query text. Test English and German terms in the built preview.
- /library/ is an authoring reference, noindex, outside Pagefind lesson bodies and learner navigation. It is English-only; its language control opens localized archive overviews.

Course navigation color is automatic: `src/lib/navigation-colors.ts` cycles blue, teal, purple and coral by global course-registry position, before grouping into knowledge areas. Chapters, groups and active lessons inherit the course color. Append new courses to preserve existing assignments; do not add course-id color selectors or lesson color fields. Reordering courses deliberately reassigns their colors. This cycle does not alter the semantic colors used inside teaching figures.

## Dependencies and source hygiene

Keep package.json and package-lock.json synchronized. npm ci reproduces the locked versions. The package is private; the interactive library is internal source, not a separately published npm package. Prefer no new dependency for an existing asset family. Keep Node/version upgrades deliberate and documented.

Do not track dist/, local-web/, node_modules/, .astro/, .sites-runtime/, or private references/source/. Do not duplicate the source PDF in public/. Never delete source material to make a build pass. When moving the package, stop its preview first and update documentation, workflow paths, package metadata, and verification together.

## GitHub Pages

The active workflow is repository-root .github/workflows/mynotes-pages.yml, authorized on 3 November 2026. It builds pull requests and relevant main pushes with Node 24 and npm ci, runs the complete production checks, and deploys successful main builds to https://ordinantsystem.github.io/MyNotes/. GitHub Pages must use GitHub Actions as its source. The artifact contains only myNotes/my_notes_web/dist. The older my_notes_web/deployment/github-pages.yml remains a reference template; edit the active workflow for hosting changes.

The intended flow remains: edit → validate/build → authorized commit/push → CI build → successful publishing-branch deployment. A local commit does not itself publish. Generated files are artifacts, not source commits. Confirm current hosting/action details when activating the template; a folder rename does not authorize deployment.

## Concurrent episode work

`npm run build` and `npm run preview` now take the same cooperative process-owned lock. `npm run lesson:integrate -- lesson-work/reasoning-N` activates and verifies one completed module without shared registry edits; failures remove the candidate and restore the prior build. See [parallel-lessons.md](parallel-lessons.md) for ownership, staging, chapter definitions, lock recovery and the next-session prompt.
