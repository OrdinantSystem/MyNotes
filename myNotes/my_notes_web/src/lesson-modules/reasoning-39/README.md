# Episode 39 — Anchoring and framing

One bilingual lesson, `anchoring-and-framing`, order 39 in Part Five / Teil Fünf. The user requested 39. The source title says 36, but its final note explicitly identifies curriculum entry 39; the original is preserved unchanged. Existing lesson 36 is a different lesson. This module owns no shared registry, source list, gallery branch, CSS shell or other worker's episode.

## Source contract

Private episode-39 provenance preserves the supplied script, fifteen image references and block dispositions with checksums. The public lesson preserves the teaching argument through anchoring, relevant/irrelevant €300,000 examples, Bayesian independence, exhaustive binary outcome complements, attribute versus risky-choice framing, both gain/loss alternatives, expected value, reference points, four normalization questions, contextual information leakage, all four practice questions and normative invariance. Timing, promotional branding, production instructions and subjective ratings remain private. English director-facing sentences become learner-facing directions. German covers the complete teaching argument. Both pages remain unreviewed.

The source's Bayesian conditional-likelihood derivation gains an explicit positive hypothesis-probability assumption to avoid an undefined conditional probability. Recorded frequencies are not claimed to establish future reliability. The source expected-value and invariance extensions remain labeled as source teaching extensions. Extra feedback, local input controls, no-diagnosis qualifications and the clarification that B never saves exactly 60 in one trial are additions.

Research: Tversky–Kahneman 1974 and 1981, Levin–Schneider–Gaeth 1998, and Sher–McKenzie 2006. Bibliographic details and relevant primary text/abstracts were consulted; no study's audience outcomes are attributed to these fictional teaching activities. The dot distributions are explicitly schematic. The €300,000 apartment example is fictional, not current valuation advice. No claim is made to have reviewed Kahneman's full book.

## State and representation contracts

- `opening`: one machine, first success description, then failure description, then the common 100-outcome grid. Two optional local text fields preserve impressions; reset clears them. A response is not required to continue reading. The static first description and surrounding explanation are useful without JavaScript.
- `estimate`: 137 stable, separated dots, an independent bounded integer estimate (0–1000), then a hypothetical 210 from the script, optional revision and reason, then the actual count. Invalid/fractional input is rejected; zero is valid. The estimate is committed before the external number is revealed. The approximately six-second suggestion is untimed for accessibility; there is no automatic animation. Reset cannot undo knowledge of the external number. This is reflection, not a controlled anchoring experiment.
- `frames`: the same 100 SVG rectangles retain identity, coordinates and classification. Switching positive/negative/neutral changes heading and emphasis only. No controller replacement of the grid, movement, disappearance, classification change or generated fake data. Each state includes labels and the full 90/10 record; color is not the only carrier of meaning.
- `risk`: gain choice A/B, loss choice A/B, then neutral outcome table. Neither choice is marked correct. A always saves 60; B saves all 100 with probability 0.6 or none with probability 0.4. Both means are 60, but B has variance 2400 versus A's zero. Variance is a focused model check, not an extra prerequisite or displayed metric. State/history/reset are per-instance.
- `quiz`: four source questions, three native radio choices each, local reasons and reset. No implied mastery grading, answer submission, tracking or persistence. All data remain in the page until reset/navigation.

Thirteen figure variants use these same native grids, number lines and outcome tables. A schematic wheel-to-number relationship uses static deliberate inspection instead of automatic motion. The source synthesis image shows fewer than 100 shapes; the implementation uses exactly 100 throughout, agreeing with the stated population. All colors come from canonical semantic tokens.

`model.ts` is pure state/mathematics; `render.ts` supplies SVG/HTML; `copy.ts` localizes interface text; the controller updates only its own module roots. The existing public module API registers lesson figures, thumbnail, activities and independent gallery instance. No dependency or shared API change is needed.

Use Node 24 from the application directory. Run `node lesson-work/reasoning-39/verify.mjs`, then the locked `npm run lesson:integrate -- lesson-work/reasoning-39`. Updates use `npm run lesson:update -- lesson-work/reasoning-39`. See VERIFICATION.md for executed build/browser checks and concrete limits. No commit, push or publication is authorized by this content task.
