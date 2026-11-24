# Reasoning Episode 14: sets and mathematical worlds

`sets-and-mathematical-worlds` is the sixth Part Two page in English and German, order 14, source `reasoning-episode-14`, prerequisite `quantifiers-and-dependence`. Both pages preserve all eight sections, the central question, set definitions, element/subset distinction, operations/logic table, De Morgan relationship, arbitrary empty-subset argument, model distinction and reference reading. All 134 earlier MDX files remain unchanged. Original bytes, checksum, 201 paragraph dispositions and dependency baselines remain private and ignored. Both pages remain unreviewed.

Production timings, editorial overview and production notes are excluded from learner prose. Their mathematical distinctions are retained by the explanation and figures. The membership close-up now shows all eight objects rather than omitting two blue objects. The empty-intersection figure likewise shows both nonempty component sets completely. The checkpoint clarifies that questions 1–2 concern the original eight-object world, while question 3 concerns logical consequence across all worlds satisfying the new premise. This avoids silently assuming the original world satisfies T ⊆ R (it does not). Source UI scoring is omitted; questions begin unanswered and provide local explanatory feedback.

## Mathematical and public contracts

The original world has red triangles a/e, red squares c/g, blue triangles b/h and blue squares d/f. `world-model.ts` is the single source for objects, memberships, selected results, countermodel truth and quiz bounds. It reuses unchanged `finiteSets` from `reasoning/examples.ts` and the existing Boolean implication from `logic-model.ts`. No general set/parser engine or external dependency is added.

`Interactive kind="worlds" preset="operations|countermodel|checkpoint" id="unique-id"` supports:

| Preset | State and behavior |
| --- | --- |
| operations | Select R, T, R ∩ T, R ∪ T or U ∖ R with native pressed buttons. Initially intersection. Every result is sorted in the original universe order; all eight objects remain visible. Members have a strong outline and a matching state-derived mathematical readout. Nonmember labels retain normal text contrast. |
| countermodel | A separate universe initially contains red triangles p/q and blue square s. Add/remove only red square r. The premise remains true; the conclusion changes from true to false. The witness and feedback derive from the same object data. |
| checkpoint | Three initially unanswered native radio groups, answer-specific feedback, optional native reference answers and reset. No score, remote grading, storage or mastery claim. |

Every instance is independent. All controls are stable while only outputs update, so focus is retained. Enter/Space and ordinary radio keyboard navigation work. Reset restores intersection, removes the additional square, clears answers and closes reference disclosures. A polite status region announces readable current results; state stays local. Initial content is server-rendered. Controls and SVG geometry share canonical tokens, localized copy and restricted MathText/KaTeX. Red objects use coral and blue objects use blue; shape and object names, explicit labels, text readouts and the classification view preserve meaning beyond color.

Four `ReasoningFigure` kinds are added: `world-inventory`, `world-membership`, `world-empty`, and `world-drawings`. The first three show the complete original eight-object universe. The last is schematic: both drawings satisfy T ⊆ R and keep triangles separate from squares, while red/square regions may be separated or overlap. No object is drawn in the schematic overlap, and the caption explicitly states that geometric overlap does not establish an occupied intersection. An actual witness is introduced only by the separate countermodel. The overlapping-region outlines remain fully visible; their labels sit inside the regions away from the boundaries. All three activities, all four figures and a second independent operations view run in `/library/`.

## Checks and limits

`verify-worlds.mjs` checks independently specified memberships, all five results, the original world's counterexamples, disjoint nonempty shape classes, all 65,536 pairs of subsets for De Morgan, complement dependence on the universe, all 16 combinations of the four color/shape categories, the exact added-square countermodel, all eight quiz choices, invalid/bounded state, independent defaults and EN/DE math rendering (including every quiz prompt/option). Full build checks, browser matrices, source preservation and prefix/root restoration are recorded in `VERIFICATION.md`.

Finite checks exhaust the selected examples; the visible arbitrary-element argument explains why the empty set is a subset of every set. A diagram remains an illustration, and neither successful rendering nor passing checks establishes independent mathematical/translation review, a complete accessibility audit or learning outcomes. Content implementation does not authorize commit, push or publication.
