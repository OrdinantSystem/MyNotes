# Reasoning Episode 16: explanations and proofs

`what-makes-a-proof` is the eighth Part Two page in English and German, order 16, source `reasoning-episode-16`, prerequisite `equivalence-relations`. It preserves all eight teaching sections, the invalid opening argument and its diagnosis, positive-picture/domain qualification, complete repaired proof, axioms and proof dependencies, both supporting lemmas, visual-proof qualification, stronger false claim and counterexample, four proof questions, five-question checkpoint and further reading. Both pages remain unreviewed.

The private original, checksum, 314 paragraph dispositions, prior-lesson hashes and shared-source baselines are ignored under `references/source/reasoning-episode-16/`. Branding, duration, timestamps and the repetitive production teaser are omitted. Widget text becomes localized components at its original position. Optional checkpoint reference answers are added. The source's informal “sum = odd” diagram notation is expressed as a parity statement rather than equality with a word. The historical Lincoln reference retains the explicit distinction between a reported interest and a causal claim; the linked primary transcription and the author's Book of Proof contents were checked.

## Models and interactions

The pure `justification-model.ts` reuses unchanged `oddSum`, `parityInput` and bounds from Episode 04's parity model. General arithmetic uses signed integer witnesses; physical objects use only 0–6 complete pairs plus one leftover, representing positive odd integers 1–13. Those are display bounds, not restrictions on the theorem. Zero pairs means one leftover, not an empty odd collection. Independent witnesses may coincide; they are never required to differ. The initial pair counts are 1 and 2.

`Interactive kind="justification" preset="opening|representations|challenge" id="unique-id"` supports:

| Preset | Behavior |
| --- | --- |
| opening | Two initially unanswered native radio choices diagnose whether the proposed argument proves the universal claim. Each receives local feedback; reusing k forces equal inputs, although the conclusion is true. |
| representations | Native pressed buttons switch between objects, general symbols and proof structure. Independent range/number inputs control complete pair counts in the object view. Both original leftovers become exactly one additional output pair. Switching views preserves the counts; symbolic views explicitly state the integer witness conditions and general argument. |
| challenge | Four initially unanswered radio choices plus a deliberate Check button, disabled before selection. Only a checked answer reveals feedback. Changing selection clears feedback. The correct fact is integer closure, not witness equality or an even multiplier. |

Reset restores only the current instance: objects with counts 1/2, or unanswered questions and a disabled check button. Controls remain stable while outputs change, preserving focus. Valid numeric input updates immediately; invalid/incomplete input leaves the last valid model intact and is restored on blur or Enter with explanatory status. Native pointer, range arrows, numeric input, radio arrows and Enter/Space work. State is bounded, local and independent, with no answer collection, persistence, score or mastery claim. Initial diagrams and all central explanations render without JavaScript.

Localized copy, mathematical state, escaped render helpers, browser control and token styling are separated. SVG/MathText/KaTeX share canonical configuration; blue existing pairs and teal leftovers/new pair have explicit labels and mathematical readouts. No amber, framework, dependency or general proof/parser engine is introduced.

## Static figures and reuse

Seven `ReasoningFigure` kinds have the `justification-` prefix: `examples`, `repair`, `dependencies`, `foundations`, `lemmas`, `roles`, and `counterexample`. Repair uses existing Flow with localized data. The other figures use semantic HTML, the existing Math/MathText components and limited code-native dependency geometry. The two branching views justify a focused static addition: linear Flow cannot show independent premises converging on one inference, and the existing interactive MindMap requires a single reachable central concept rather than multiple proof premises.

The full proof graph includes independent integer witnesses, a connection to integer closure, the algebraic form, and the definition of even. A conclusion depends on all three final ingredients. Foundation diagrams are explicitly simplified illustrations, not claims that every theorem follows without extra hypotheses. At compact widths, readable nodes and explicit dependency lists replace the lines. Arrows are decorative complements to the semantic node text and surrounding complete explanation. Unique marker ids prevent collisions. All activities, every figure and a second independent representation activity run in `/library/`.

## Verification and limits

`verify-justification.mjs` checks signed witnesses on −30…30, all 49 physical pair-count combinations in both languages, independent and equal inputs, negative examples, the exact 1+5 counterexample, three-odd lemma reuse against direct arithmetic, complete/acyclic proof dependencies, all question choices, bounded input, independent reset defaults and localized mathematics. Finite checks verify implementation; the visible arbitrary-integer argument supplies the general proof.

Production, prefix, browser, preservation and preview results are recorded in `VERIFICATION.md`. Passing checks do not establish independent mathematical/translation review, a full accessibility audit or learning outcomes. The content request does not authorize commit, push or deployment.
