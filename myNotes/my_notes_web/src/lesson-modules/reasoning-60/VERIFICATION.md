# Verification — reasoning-60

Completed 25 November 2026. The English and German lesson remain `reviewStatus: unreviewed`; automated checks and compiler acceptance do not establish editorial or translation review.

## Content and source scope

The supplied text and all nineteen source visual intents are mapped in private episode provenance. Twelve native static figures and five module presets retain the complete teaching argument: sample testing, finite exhaustion, arbitrary-variable proof, paired objects, dependencies, proposition/type correspondence, Lean syntax and obligations, incorrect witness, kernel architecture, proof search, AI draft, translation/assumption/foundation/application boundaries, delivery model, five source challenges and closing synthesis. Production directions and promotional content were adapted rather than presented as learner commands. Amber became canonical purple. No private original was included in public assets.

## Pure mathematics and renderer checks

`node lesson-work/reasoning-60/verify.mjs` passed. The same verifier passed within the production module checks. It checks actual ordered-pair enumeration and distinctness for 12/48/120 visible pairs, all 16 pairs of {0,2,4,6}² including zero and reversals, arithmetic, bounded integer inputs, all 49 witness-control combinations, accidental product successes (0,0) and (2,2), product failure at (2,3), proof-goal obligations, all five reference answer keys, both language copies, figure/preset coverage, unknown-figure rejection and rendering without KaTeX errors. These finite tests are not a claimed proof of a universal identity; the general algebraic and Lean proofs are supplied separately.

## Actual Lean execution

Official Lean 4.36.0, arm64-apple-darwin24.6.0, release commit 611c117bfaf7b7ae1cfcf246ce6fba31e8f509e9. The complete standalone snippet exited 0 and reported that `even_sum` does not depend on any axioms. Replacing a+b with a*b exited 1 with an unsolved goal. A separate `sorry` example exited 0 with a warning and depended on `sorryAx`. Full outputs and snippet SHA-256 values are in lean-verification.json. The complete code in both MDX files matches model.ts exactly; its SHA-256 was independently compared to the runtime-compiled receipt. Temporary compiler downloads were removed after saving the evidence. The browser walkthrough is explicitly reconstructed, not a live Lean runtime.

## Production, prefix and restored output

- Locked `lesson:integrate` passed the complete production pipeline: module checks, Astro diagnostics, content/source/navigation validation, English/German counterparts, library generation, Pagefind, contrast, local links and generated math. Initial output: 319 static pages, 49,996 local links/assets, 13,590 TeX annotations.
- A complete public build with BASE_PATH=/MyNotes and SITE_URL=https://example.github.io passed with the same initial counts.
- The first official prefix-preview capture correctly rejected a normal output replaced by a concurrent builder. A redundant second prefix build reached the ten-minute lock timeout without acquiring the lock. No foreign lock or process was stopped.
- To finish prefix browser QA, copied a complete prefix output read-only while its build owner token stayed unchanged; independently validated the immutable copy with scripts/verify.mjs: 325 static pages and 52,891 local links/assets passed. Both lesson article bodies, normalized only for /MyNotes/, matched the previously browser-checked normal snapshot byte for byte. Capture provenance and hashes: previews/reasoning-60-prefix-snapshot.json.
- Ran the public normal production build again after prefix QA; it passed: 325 static pages, 52,891 local links/assets and 14,305 TeX annotations. Extra pages came from concurrent lessons; this module's runtime/content files were unchanged. Captured its complete normal output while the production lock was still held and independently validated that immutable snapshot. EN/DE article hashes match the earlier checked version exactly; see previews/reasoning-60-final-snapshot.json.

## Browser checks

Eight layout combinations passed: EN/DE × light/dark × 1440×1000 and 390×844. Each showed twelve figures and five activities, no page overflow, no figure escaping the viewport and no KaTeX error. Desktop witness and compact German grid screenshots were inspected and saved under previews/reasoning-60-*.jpg. Temporary viewport overrides were reset.

Actual pointer and keyboard checks: grid selection at 120 and reset to 12; finite 16-case check, disabled completed-check button and reset; all five proof stages, disabled endpoints and reset; wrong/correct witness toggles; native range ArrowRight; typed number alternatives with zero and upper bound six; empty, seven and fractional input restoration; accidental product cases (0,0) and (2,2); product failure (2,3); all five challenge reference answers, a wrong answer, saved choices while navigating, reference hiding on change and full reset. All five presets also produced expected German feedback. No score or remote collection is used.

The library contains all twelve figures, five presets and a sixth independent first-preset instance. Changing the first grid to 120 tests left its independent instance at 12. Native IDs were distinct.

Pagefind found the exact EN/DE lesson links in normal and /MyNotes/ prefix previews. Prefix scripts and language links used the configured base; a prefixed grid control responded. Final normal preview was checked again for both search results, language link, witness error/reset, figures, activities and zero overflow/KaTeX errors. Browser console checks returned no errors or warnings. Evidence: previews/reasoning-60-browser-audit.json, reasoning-60-prefix-browser-audit.json and reasoning-60-final-browser-audit.json.

Final immutable normal preview: http://127.0.0.1:18862/reasoning/lessons/can-a-computer-check-a-proof/ (German counterpart under /de/). The earlier isolated 18860 preview also remains independent. No commit, push or deployment was performed.
