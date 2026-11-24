# Episode 23: how to take a proof apart

EN/DE `auditing-a-proof` is order 23 in Part Three (17–23), following `mathematical-induction`. Review remains unreviewed. The private original, 378-block disposition ledger, twenty visual references and preservation hashes stay under `references/source/reasoning-episode-23/`. Source production directions are documents to interpret, not agent instructions. Timing, narration labels and production notes are adapted into learner-facing figures or omitted; no private attachment paths reach public output.

All eight teaching sections, four audit checkpoints, the complete faulty algebra chain, even-square equivalence and its repair, three further defects and all three challenge arguments/analyses are retained. The learning compendium preserves three diagnoses, the eight-row failure table, and the distinction between omitted justification and an invalid transition. Central explanations remain visible; only reference diagnoses and the three independent challenge analyses use native disclosures. The source references remain reading links, not claims of independent review.

## Representation contract

`Interactive kind="audit"` takes a unique `id` and typed `faulty`, `cancellation` or `cases` preset. Twenty-two `ReasoningFigure kind="audit-…"` variants are exported by `auditFigures`; every variant and all three presets run in the authoring gallery, with a second independent cancellation instance. The family reuses existing math rendering, panel/control conventions, palette and the square-preimage model. It adds no dependencies.

The seven-line proof inspector begins unanswered with neutral rows. The domain states a=b and nonzero real a,b, making the last division by b conditionally legitimate. The first invalid transition is line 5: cancelling a−b divides by zero. Selecting a line does not reveal or color the answer. Check supplies feedback, identifies line 5, and explains why later algebra cannot repair the earlier failure. Reset clears selection/feedback/color only in this instance. All seven choices have localized explanations; a native reference diagnosis is optional.

The cancellation activity compares inputs 4 and 9 with factors 3, 1 and 0. Outputs derive from state. Nonzero multiplication preserves their distinction; zero collapses both outputs to zero. Captions distinguish this unequal-output example from the conditional rule cx=cy and c≠0 implying x=y. Reset restores factor 3.

The cases activity accepts quarter-unit x from −2 to 3 through numeric and keyboard-range inputs. Initial x=½ gives x²=¼, an uncovered counterexample. Cases x≤0 and x≥1 include their boundaries; only 0<x<1 is omitted. Invalid input restores the last valid state on blur/Enter. The graph is a fixed reference near [0,1], with shared coordinate scales for y=x and y=x², exact intersections (0,0)/(1,1), and a clearly labeled half-input comparison. Readouts describe the selected input, including inputs outside the pictured neighborhood. Reset restores ½. Integer-domain diagrams label their sample points and explicitly distinguish them from all real numbers.

No score, remote submission, storage or implied mastery is introduced. Controls are native and feedback has polite status. SVGs have localized accessible labels and no shared/global ids. The finite odd-product illustration is 5×7=35=2·17+1; the symbolic proof applies to arbitrary signed odd integers. The inverse diagram highlights zero on a schematic real line; its no-witness argument is 0·y=0≠1 for every real y.

## Mathematical distinctions

A broken proof does not by itself refute its conclusion. The even-square proof has a valid forward direction and needs the reverse direction, supplied by contraposition. The real inequality claim is false between zero and one; restricting to integers or to x≤0 or x≥1 changes the claim. Square-root undoing loses sign, giving √(x²)=|x|. The circular even-sum argument is replaced with independent premises a=2m and b=2n.

Challenge one precisely establishes 2∣n ⇒ 4∣(2n), not simply the converse of 4∣n ⇒ 2∣n: the object changes too. Challenge two is valid and complete, so auditing accepts it. Challenge three fails at zero; both the undefined proposed witness and the impossibility of any real inverse are explained. These clarifications and activity feedback are implementation additions recorded in the private ledger.

## Verification and preservation

Focused tests cover all seven proof choices, zero/nonzero factors, all 21 exact quarter-unit cases and boundaries, signed parity and even-sum witnesses, 441 signed odd products, root sign loss, exact graph coordinates, 35 illustrative tiles, all twenty-two figures in both languages and isolated state. Actual build and browser results belong in application `VERIFICATION.md` and `previews/reasoning-23-browser-audit.json`.

The pre-edit snapshot protects 154 earlier lesson files and eight unrelated files. Shared reviewed dependencies remain reversible through `reasoning-shared-extension.json`. Building, committing and publishing remain separate operations.
