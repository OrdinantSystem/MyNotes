# AoR61 verification — 25 November 2026

The bilingual Part Eight module contains thirteen figures and five native activities. Both locales retain reviewStatus: unreviewed; automated checks do not constitute mathematical or editorial review.

Production integration passed under Node 24 using the locked lesson workflow. The successful build checked types, module identities, localized counterparts, navigation, library models, Pagefind generation, 325 generated pages, 52,891 local links/assets, 14,305 rendered TeX annotations and text contrast in both themes. Two earlier candidate failures (display delimiter formatting and a nested disclosure) were corrected before the successful build; rollback restored the preceding source each time.

Pure verification passed again after the interruption: all 66,066 binary relations on domains 1–4 checked against an independent quantified oracle, all 689 rectangular reading relations with student/book counts 0–3 including empty extensions, 32,768 one-sorted transfer interpretations including overlapping predicate extensions, matrix toggles, input bounds, filter counts, witness lists, rendered edge counts/loops, fixed proof scope and bilingual figure/preset coverage. These are bounded checks, not proofs of general first-order validity or metatheorems. The article gives general witness reasoning separately.

Browser verification passed on the normal isolated production snapshot at port 4461:

- English and German, desktop 1440×1000 and compact 390×844, light and dark: thirteen figures, five activities, no page-wide overflow and no equation errors. Screenshots retained in previews/reasoning-61-*.
- World comparison preserves P and changes Q; reset restores the shared-contact relation.
- Matrix controls work with pointer, Space and Enter, retain focus, and update graph/pairs/truth together. Codes 98,146,273,511 give the expected cycle/shared/identity/full relations. Negative, 512, fractional and blank input are rejected without changing the last valid relation. Reset clears invalid state and all arrows.
- Filter starts at 512/343/174; sizes 1 and 2 give 2/1/0 and 16/9/2. Reverse implication and contradictory premise cases have zero countermodels, with bounded-search and vacuity explanations. Reset restores every selector.
- Proof reveal reaches all six lines, keeps temporary witness scope explicit, disables endpoints and resets to the first line. It is a curated proof, not a general checker.
- Transfer handles unanswered, incorrect and correct responses, explains the witness, displays a converse counterexample and resets without storing answers. German controls and feedback verified for all five activities.
- Long formula supports keyboard scrolling within a labeled focusable local region.
- Gallery contains all five activities plus an independent duplicate, and all thirteen figures. The first world instance changed to the cycle while the duplicate stayed at the shared witness; reset restored only the first. The interruption occurred during gallery observation; the resulting DOM state was inspected on resume before any retry.
- English Pagefind query countermodel and German Gegenmodell both found and opened the correct localized lesson.

Prefix verification passed with BASE_PATH=/MyNotes and SITE_URL=https://example.com, followed by a successful restored normal production build. In the isolated prefixed browser preview, EN/DE links retained the base path, the native language menu opened the equivalent German lesson, the English world activity and German countermodel worked, and English countermodel/German Vollständigkeit Pagefind results opened the correct prefixed lesson. Final normal output was checked for restored unprefixed local links. Browser viewport overrides were reset; only the finished normal lesson tab was retained.

The normal immutable preview remains available. No commit, push or deployment was performed. Private source text and all fourteen supplied reference images are retained outside public output.
