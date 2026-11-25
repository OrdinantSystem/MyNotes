# Verification · AoR 63

Completed 25 November 2026. The lesson is integrated in English and German under `final-proof-workshop`, with ten figures and six activities. Mathematical and translation review remain **unreviewed**; build and browser checks do not constitute expert review.

## Production and mathematics

- Locked integration passed the full production pipeline. The first attempt caught an extensionless renderer import; the candidate was rolled back and the preceding build restored. Explicit TypeScript imports fixed the issue; reintegration passed.
- Both the `/MyNotes` repository-prefix build and restored normal build passed under the cooperative lock. Each reported 594 checked files with zero errors, 325 verified static pages, 52,891 local links/assets and 14,305 generated TeX annotations. Full library/content, localized-counterpart, navigation, Pagefind, privacy, link, math and both-theme contrast checks ran. Existing unrelated diagnostic warnings were not represented as new lesson errors.
- `verify.mjs` passed again after the power interruption: 10,002 signed odd inputs against an independent BigInt oracle; signed consecutive products; complete tile partitions, adjacent domino pairs, corresponding eight-tile groups and ring counts for every supported k=0…6; all square residues; input, reset-model and invalid-state boundaries; both languages and every figure/activity render.
- Staged and active implementation files matched byte for byte at completion. The earlier preservation check found all 232 preceding lesson MDX files unchanged. Concurrent work in other lesson folders and shared chapter labels belongs to those sessions and was not modified here.

## Browser evidence

`previews/reasoning-63-browser-audit.json` records 31 resumed assertions, all passing, nine measured layout states and the checks completed before interruption. Desktop 1440×1000 and compact 390×844 were checked in English/German and light/dark themes. No inspected figure, input, select, button or textarea extended beyond the viewport, and there was no page overflow or browser console error.

Checked signed numeric entry using native keys, slider Home/End, disabled endpoints, reset, three progressive hints, independent first/revised drafts, exact clipboard contents, clearing drafts/review and no draft persistence after reload. The DOM-only automation's programmatic numeric fill did not trigger the native change event; actual keyboard entry and blur worked correctly.

Checked all geometric stages, conserved tile counts, k=0 and k=6, negative consecutive products, layer endpoints/reset, all four deliberate examiner feedback reveals, changed-choice feedback clearing, examiner reset and both proof disclosures. The gallery contained all six activities plus a second independent explorer; changing/resetting one did not affect the other.

Verified compact navigation, current-lesson visibility, EN/DE language switching, English and German Pagefind results and repository-prefixed lesson/section links. Full interaction/layout QA used an immutable production snapshot containing the same integrated module while the build queue ran. After the owned prefixed build finished, its English/German routes and six activities were checked again; the restored normal preview and a live geometry interaction passed at `http://127.0.0.1:4321/reasoning/lessons/final-proof-workshop/`.

Screenshots: final desktop, geometry, comparison, compact English light, compact German dark/light. Temporary viewport overrides were reset. The normal preview remains running; temporary lesson-only preview servers were closed after checks. No commit, push or deployment was performed.

## Concrete limits

Controls bound illustrations, not the theorem's integer domain. Geometry models k=0…6 and uses a numbered first corresponding pair group rather than animation. Drafts are local, capped at 12,000 characters each, and intentionally not saved across reloads. Self-review is unscored; free text is neither submitted nor automatically validated. The mathematical argument covers every signed odd integer and all even-square cases independently of the finite explorer.
