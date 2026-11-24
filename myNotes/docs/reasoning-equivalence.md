# Reasoning Episode 15: equivalence relations

`equivalence-relations` is the seventh Part Two page in English and German, order 15, source `reasoning-episode-15`, prerequisite `sets-and-mathematical-worlds`. It preserves all ten teaching sections, general proofs, the equality/equivalence distinction, parity exercise, abstraction discussion, learning checkpoint and recommended reading. Branding, timing and the closing production note are omitted. Private original bytes, checksum, all 320 paragraph dispositions and preservation baselines live in ignored `references/source/reasoning-episode-15/`. Both editions remain unreviewed. Earlier lesson files are preserved, including the separate Analysis revision-sheet work present at task start.

The reverse implication from a multiple-of-three difference to equal remainders is made explicit. The shared-element argument spells out both class inclusions. A source heading saying “another property” is replaced by the normal reference-solution disclosure. The four-choice exercise starts unanswered; no transient screenshot selection or score is copied. The central parity interpretation remains visible. Quotient structures are an outlook, not an unsupported definition of class addition.

## Mathematical and public contracts

The pure `equivalence-model.ts` uses exact integer predicates. Euclidean remainder is nonnegative, including for negative inputs. BigInt intermediate arithmetic avoids incorrect results at safe-integer boundaries. Numbers outside the safe-integer domain and invalid presets/answers are rejected. Finite samples and the nontransitive neighborhoods reuse the existing `finiteSets` model; there is no new general relation/parser engine.

`Interactive kind="equivalence" preset="sorting|comparison|checkpoint" id="unique-id"` provides three local, independent activities:

| Preset | Behavior |
| --- | --- |
| sorting | Native 4/7/8 pressed buttons highlight the corresponding remainder class. Initially 4. All eighteen sample integers stay visible; every result is derived from the same model. Labels explicitly state that the classes are infinite. |
| comparison | Native buttons switch between the 4/7/10 remainder chain and the 1/2/3 distance-at-most-one counterexample. All three pairs receive textual verdicts. Initially remainder. |
| checkpoint | Four initially unanswered native radio options about the even-sum relation. Every choice receives explanatory local feedback; the third is correct. A separate native Exercise disclosure in the lesson contains the full reference proof. |

All controls remain stable while outputs update, retaining focus. Native keyboard input and reset work; polite status regions announce plain current results. Nothing is submitted or stored remotely. Initial content is server-rendered. Reset restores only its own activity; it does not modify the separate lesson solution disclosure.

Eleven `ReasoningFigure` variants have the `equivalence-` prefix: `opening`, `machine`, `tests`, `chain`, `partition`, `shared`, `classes`, `neighborhoods`, `parity`, `files`, and `quotient`. Semantic responsive HTML retains readable labels. SVG is limited to actual numerical relationship geometry. Edges stop at nodes rather than crossing number labels. Identical class boundaries coincide; distinct class boundaries are visibly separated. The shared-element view is explicitly a proof assumption, not a valid partial-overlap picture. Neighborhoods are not called equivalence classes. Files are fictional examples with exact equal bytes, not a hash test or actual filesystem inspection. Teal/blue/purple replace screenshot amber without changing mathematical roles.

All activities, figures and a second independent sorting instance run in `/library/`. Localized copy, escaped renderer, mathematical model, controller and token-based styling are separate. No framework or dependency is added.

## Checks and limits

`verify-equivalence.mjs` compares remainder with independent floor division on −100…100 and moduli 1…9, tests negative/positive safe-integer boundaries with exact intermediates, checks relation predicates and equivalence properties over −15…15, verifies partition identity/disjointness in that sample, the exact nontransitive triple, overlapping neighborhoods, all answer choices, invalid states and localized rendering. These finite checks verify implementation; the visible arbitrary-integer proofs establish the mathematical claims.

Full production/prefix builds and actual browser checks are recorded in `VERIFICATION.md`. Passing tests do not establish independent mathematical or German-language review, a complete accessibility audit, or learning outcomes. Editing the lesson does not authorize Git writes or publishing.
