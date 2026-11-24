# Analysis I · Second Exam Prep

The owner requested a separate section and one new lesson from the supplied Lernzettel 01 text and seven screenshots on 23 November 2026. `analysis-second-exam-prep` is registered in the existing Analysis I navigation, with direct lesson links and no empty future entries. Its first EN/DE lesson is `lernzettel-01`, course order 21, kind `recap`, source `analysis-second-exam-01`, review status `unreviewed`.

The original six-section/twenty-page teaching route and its preservation records remain unchanged. Exam sheets use the supplemental `analysis/second-exam-prep/` source subdirectory, still loaded recursively into the existing course and ordinary `/analysis/lessons/<key>/` routes. Global build checks cover the whole published inventory; historical Analysis contracts continue to check only the editions they certify. Future exam sheets need matching EN/DE keys, explicit source locations, distinct orders and navigation membership. The English section label is **Second Exam Prep**; German is **Vorbereitung auf die zweite Klausur**.

## Source and editorial coverage

The private source record preserves the supplied text and screenshots. All ten sections remain: statements; predicates; function notation; statement/predicate comparison; dependence on definitions versus free inputs, including the powerset example; free/bound variables; both quantifiers and proof obligations; the Kalupe vocabulary, three premises and five candidate conclusions; proof methods; and eight recall prompts. Conversational opening/apology and session-specific references are removed. Screenshots guide the code-native figures rather than becoming public images. Source paths, original attachments and private records are not public links.

Transport escapes are converted to valid TeX. The natural-number convention and classical two-valued semantics are explicit. The function signature is distinguished from its rule; the switch from evenness to primality is explicit. Quantifier scopes have parentheses. The proof map distinguishes a universal counterexample from refuting an existential claim. The open-variable warning gains an example with free $y$; empty-domain quantifier behavior is stated. Truth-value notation is distinguished from the instantiated claim. The five Kalupe conclusions remain unanswered, as in the supplied revision sheet. Worksheet task descriptions are attributed to the supplied text rather than an unseen original worksheet. These clarifications are authoring changes, not an independent mathematical/translation review.

## Representations

`LogicFigure` supplies three localized static variants: `concept-map`, `predicate-mapping` and `proof-paths`. Existing `Flow` data handles predicate input/output and free-to-bound variables. The function diagram shows exactly 1→0, 2→1, 3→0, 4→1; text labels and accessible SVG descriptions retain meaning without color. The concept map keeps quantifier binding within the open-formula branch. All primary explanations remain visible.

`RecallChecklist` accepts `items: string[]` with explicit MathText notation. Native labeled checkboxes and form reset work without JavaScript. There is no score, claim of readiness, storage or remote submission. Both components use shared theme/spacing tokens and are registered in MDX and the developer gallery. Compact concept/proof branches stack; tables and wide formulas use existing local scrolling. See [the verification record](../my_notes_web/VERIFICATION.md) for checks actually run.

## Preview navigation follow-up

During authoring, a failed build left the live `dist/` preview incomplete and the owner reported 404s. A completed root build restored the routes. The preview launcher now validates and serves a separate snapshot, so later in-progress or failed builds do not remove pages from the open preview. This is a local development change; public course URLs and hosting remain unchanged. See [development](development.md).
