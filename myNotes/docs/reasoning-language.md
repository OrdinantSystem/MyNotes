# Reasoning Episode 10: words, meanings and evidence

`words-meanings-and-evidence` is the second EN/DE page in Part Two, course order 10, after `belief-and-logical-structure`. Its text source identity is `reasoning-episode-10`, sections 1–8 and further reading. Original text, paragraph dispositions, source hashes and all 126 preceding lesson hashes are preserved privately. Prior lesson sources remain unchanged. Production branding/timing is omitted; screenshot controls become shared representations. English narration retains its wording and order, with transport-escaped TeX normalized. German translates the full explanation. Both remain unreviewed.

The supplied text says that changing the meaning leaves logical form unchanged. An adjacent, labeled clarification distinguishes the unchanged sentence pattern from formalizing two distinct properties; the source narration remains intact. The German software example explicitly discusses the English word “free”, whose price/freedom ambiguity does not map to one ordinary German word. The GNU definition is linked alongside the supplied readings, with tracking parameters removed.

## Public representations

`Interactive kind="language" preset="interpretations|scores|median|tests|threshold|free|tall|rewrite" id="unique-id" group="optional-shared-state"` uses native buttons, radio groups, range and numeric inputs. Each instance is isolated unless an explicit group matches. The lesson links interpretations, scores, sorted median and mathematical tests through `study-data`. The threshold, software example, height rule and final rewrite have independent state. Reset restores the values controlled by that preset. The score button restores +30 and nine −2 while retaining the selected interpretation; the interpretation reset restores the mean reading while retaining the scores. No persistence, submission or analytics is added.

| Preset | Contract |
| --- | --- |
| interpretations | Mean > 0, strictly more than half improving, or median > 0 as one explicitly chosen working interpretation of “typical”; no unique typical-person claim. |
| scores | One gain G and nine losses of 2, or one loss G and nine gains of 2; integer magnitude 0–40, initially 30; chart, mean, median, counts and selected verdict derive from one dataset. |
| median | Sorts the current linked dataset and highlights positions 5 and 6; their average determines the median. |
| tests | Current mean and strict improving-majority tests, with KaTeX formulas and notation reading. |
| threshold | Independent original gain arrangement; mean (G−18)/10 is positive iff G > 18, zero at 18, negative below. At G = 0 nobody improves. |
| free | Ordinary freedom reading gives no price conclusion. Hypothetical no-price reading makes the inference valid. |
| tall | Hypothetical inclusive height ≥ cutoff, integer cutoff 155–205 cm; a fixed 180 cm person changes classification at 181. Stipulation is separated from ordinary-language meaning. |
| rewrite | Starts unselected; tests three rewrites against the fixed original data, with distinct individual/causal overclaims and descriptive feedback; a native reference disclosure works without JavaScript. |

The prose’s original example always uses +30 and nine −2, mean +1.2, median −2, one improving person. Explorer state is explicitly labeled; changing it does not alter the original-evidence claims later in the lesson. Zero mean is never labeled positive or negative. The shared chart uses a fixed −40…40 scale and signed labels; color is redundant with signs and text. Initial chart/results are server-rendered.

`ReasoningFigure kind="language-summary|language-independence|language-shift|language-contrast|language-uses|language-evidence|language-fairness|language-possible|language-problems|language-question"` covers all static screenshot relationships. Semantic HTML keeps labels readable and reflows at compact widths. Shared tokens and counterexample frames preserve the canonical shell. All eight presets and ten figures run in `/library/`.

Pure data and predicates live in `language-model.ts`, localized copy in `language-copy.ts`, escaped semantic rendering in `language-render.ts`, controls in `LanguageLab.astro` and static views in `LanguageFigure.astro`. The browser updates rendered views without replacing controls, retaining keyboard focus. Numeric inputs commit on change, reject nonintegers/out-of-range/blank values and restore the last valid state. Reset, pressed state, radio semantics, actual aria-controls targets and polite status feedback support optional exploration.

## Verification boundaries

`verify-language.mjs` independently checks every slider value in both arrangements, strict-majority equality, medians of odd/even datasets, zero and threshold boundaries, all 51 height cutoffs, interpretation-sensitive inference, all three rewrite outcomes and EN/DE formula rendering. It runs in the full production build. The original Analysis dependency manifest reconstructs its complete historical baselines; prior source hashes are retained. Browser and build evidence are recorded in `VERIFICATION.md`.

These are fictional data and bounded language examples, not a statistical estimator, arbitrary argument parser, causal model or fairness evaluator. Passing implementation checks does not certify expert mathematical/translation review, learning outcomes or a comprehensive accessibility audit. No Git writes or publication are authorized by this lesson request.
