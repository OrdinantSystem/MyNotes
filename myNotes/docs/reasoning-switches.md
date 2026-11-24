# Reasoning Episode 12: reasoning with switches

`reasoning-with-switches` is the fourth EN/DE Part Two page, order 12, source `reasoning-episode-12`, following `implication-and-its-converse`. Both pages retain the full ten-section explanation, proof, source reading and learning checkpoint. All 130 preceding lesson sources remain unchanged. The original and all 330 paragraph dispositions are private and ignored. Production branding, runtime and link-preview residue are omitted; transport-escaped mathematics and broken aligned line breaks become native KaTeX. Tracking parameters are removed. Both pages remain unreviewed.

The added model assumption makes the rule complete: the Boolean condition determines the door, with no additional conditions or faults. This differs from the merely necessary admission requirements in Episode 11. The supplied screenshots inform the implemented-circuit view and reference solution, rather than becoming image assets. Unconditional screenshot feedback becomes an initially unanswered native quiz. The central derivation remains visible; only reference answers and the challenge solution use disclosures.

## Public representation contract

`Interactive kind="switches" preset="access|override|scope|demorgan|routes|simplify|checkpoint" id="unique-id"` uses the existing unchanged `logic-model.ts` operations. The focused `switch-model.ts` derives every output and proof stage. `switch-copy.ts` supplies English/German labels; `switch-render.ts` renders escaped semantic HTML and restricted MathText. No new logic parser, framework, storage, backend or remote answer collection is introduced.

| Preset | Meaning |
| --- | --- |
| access | Series P then Q; downstream signal reaches the door only if both hold. ON/OFF records the individual switch state, distinct from powered signal. |
| override | Parallel ordinary P AND Q and override R routes. Either route, including both together, opens the door. |
| scope | Compare NOT P AND Q with NOT (P AND Q). P true/Q false is a distinguishing assignment. |
| demorgan | Compare NOT (P AND Q) with NOT P OR NOT Q. These are failure conditions: true means locked, false means open. |
| routes | Implemented parallel P AND Q / P AND NOT Q circuit. Output equals P in every case. |
| simplify | Same circuit plus optional reference solution P and complete comparison table. |
| checkpoint | Three initially unanswered radio groups, local answer-specific feedback and native reference answers. No score or mastery claim. |

Inputs initially P true/Q false/R false. Native labeled checkboxes support pointer and keyboard interaction; reset restores this state, clears quiz answers and closes reference disclosures. Stable controls retain focus while only the output changes. A polite status region announces the initiating activity's result. `group` explicitly links the two repair views; all other instances are independent. Reset in a linked group resets both views. Solution disclosures stay open across input changes and close on reset. IDs and group keys must be unique unless sharing is intended.

Seven `ReasoningFigure` kinds are registered: `switch-and-table`, `switch-xor`, `switch-not-table`, `switch-demorgan-table`, `switch-laws`, `switch-proof`, and `switch-notation`. Tables are complete, localized and locally scrollable with keyboard focus. The XOR figure makes the both-true distinction explicit. The proof uses the distributive law, excluded middle and identity. The notation table distinguishes Boolean OR addition from integer addition. All variants and a second independent access activity run in `/library/`.

The screenshots' amber signals become canonical teal; inactive/active, on/off, true/false and open/locked remain explicit text. Responsive HTML circuit nodes retain readable labels without scaling a dense SVG. Long formulas and tables scroll locally. No sibling site or older lesson is changed by this addition.

## Checks and limits

`verify-switches.mjs` checks independently specified truth vectors, all eight P/Q/R combinations, both De Morgan laws, every simplification stage, the scope counterexample, all nine quiz choices, null and invalid answers, independent initial states and EN/DE rendering. Full production builds check generated pages, localization, source identities, navigation, links/assets, search, TeX and contrast. Browser evidence and exact counts belong in `VERIFICATION.md`.

These circuits are illustrative Boolean models. Passing finite checks is sufficient to exhaust this explicitly finite input domain; it is not independent editorial/translation review, a hardware analysis, a complete accessibility audit or evidence of learning outcomes. Content editing does not authorize commit, push or publication.
