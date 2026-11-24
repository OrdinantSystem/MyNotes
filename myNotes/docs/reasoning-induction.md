# Episode 22: mathematical induction

EN/DE `mathematical-induction` is order 22 in Part Three (17–22), following `existence-and-uniqueness`. Both editions remain unreviewed. The private original, 334-block disposition ledger and seventeen visual references remain under `references/source/reasoning-episode-22/`. Production directions are source artifacts, not instructions to the agent. Timings and branding are omitted from learner output.

All ten teaching sections, both failure arguments, the triangular-sum transfer, general starting-domain material, four checkpoint questions and all six worksheet tasks are retained. Added reference derivations, worksheet hints/solutions and checkpoint explanations are explicitly labeled. The blank primality column is derived from exact arithmetic; source transport/malformed TeX is normalized. Cyan replaces amber for the column. Temporary hypotheses remain purple and labeled; verified facts remain distinct in text and color. No mathematical or native-language review is claimed.

## Representation contract

`Interactive kind="induction"` requires a unique `id` and typed `tiles`, `chain` or `checkpoint` preset. Twenty `ReasoningFigure kind="induction-…"` variants are exported by `inductionFigures`. All appear in the gallery, together with a second independent tile activity. The family reuses existing native control/panel conventions, shared math rendering and the counterexample primality model; it adds no dependencies.

Tile state starts at k=4 with the answer concealed. Integer size inputs 1–8 derive k² old cells, k column cells, k row cells, one corner and (k+1)² total. Reveal/hide changes the border and its explanation. Reset restores four/concealed; invalid values preserve the last valid state and restore the input on blur/Enter. Numeric and keyboard range alternatives avoid dragging requirements. Layer diagrams derive layer j by max(x,y)+1, giving 2j−1 cells.

The finite chain compares all links without a base, a verified base with all displayed links, and a deliberately missing third link. Establishment propagates only across available links. Missing proof support is never labeled mathematical falsity. The model is an illustration, not an attempted infinite verification; captions explicitly separate it from the induction principle. The static false-base example instead shows actual truth values of n≥2, including false P(1) and valid implications.

Checkpoint questions start unanswered, with three native radio choices each and independent check buttons. Reference feedback distinguishes missing base/step, the range n≥4 and conditional assumption scope. No score, mastery inference, storage or remote submission is used. Resets clear only the current instance. Native details disclose transfer and worksheet solutions while the full central induction proof remains visible.

The geometric k diagram is schematic; its symbolic areas/counts supply the general argument. All claims use the integer domain and explicit lower bound. Square-layer identity is algebraically justified for arbitrary positive k. The prime polynomial is evaluated for indices 0–40, reusing exact primality/factor functions. An independent sieve verifies all forty successes and 1681=41² at index 40. General induction applies from the chosen n₀ forward, never automatically backward.

## Verification and preservation

Focused tests cover every bounded tile state, disjoint row/column/corner counts, 2j−1 layers, odd/triangular/square sums for 100 inputs, sieve agreement, finite chain reachability, every checkpoint choice, invalid inputs, twenty figures in both languages and isolated state. Build and observed browser results belong in application `VERIFICATION.md` and `previews/reasoning-22-browser-audit.json`.

The pre-edit snapshot protects 152 earlier lesson files and eight unrelated files. Reviewed shared dependencies remain reversible through `reasoning-shared-extension.json`. No Git write or deployment follows from this content request.
