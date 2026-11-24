# Reasoning Episode 11: implication and its converse

`implication-and-its-converse` is the third EN/DE page in Part Two, order 11, after `words-meanings-and-evidence`. Its source identity is `reasoning-episode-11`, sections 1–8 and reference reading. Original text, complete paragraph dispositions, existing lesson hashes and historical shared dependency baselines remain in private ignored storage. All 128 preceding lesson sources are preserved. English retains the complete narration and proof; German translates the complete explanation. Production branding/timing is omitted. Both remain unreviewed.

Transport-escaped mathematics becomes native KaTeX. The predicate definitions repair nested inline delimiters inside display text and malformed line-break escapes without changing meaning. The unresolved screenshot placeholder `chosenNumber` is replaced by the selected integer. A labeled clarification explains that “only two” compares the forms with the original; the converse and inverse form a second equivalence pair. Reference links omit tracking parameters. The inverse and admission reference answers are taken from the supplied screenshots and placed in native `Exercise` disclosures; all central explanations remain visible.

## Reuse and representations

The existing, unchanged `logic-model.ts` supplies the material conditional, converse, inverse, contrapositive and four truth assignments. No new Boolean engine or change to the Analysis activities is introduced. The small `conditional-model.ts` adds integer predicates, the fixed 4/6/7 choice domain and the admission requirement. Finite checks verify code; the retained arbitrary-integer proof establishes the universal mathematical claim.

`Interactive kind="conditional" preset="numbers" id="unique-id"` selects 4, 6 or 7. Multiples of four lie inside even integers, inside the integer universe. Four is in both regions, six only in the even region and seven outside both. A selected marker, P/Q truth labels, actual n value and explanatory feedback update together. Initial state is six. Native pressed buttons offer pointer, Enter/Space and ordinary keyboard navigation; reset restores six without replacing controls or moving focus. A polite status region announces the numerical predicate results. Each instance is independent, with a second working gallery instance. No slider, arbitrary numeric entry, storage, remote submission or scoring is needed for three discrete cases. Initial content is server-rendered.

`ReasoningFigure` adds six variants:

| Kind | Relationship |
| --- | --- |
| conditional-roles | P sufficient for Q; Q necessary for P; antecedent/consequent and one-way arrow. |
| conditional-cases | All four truth combinations; only P true/Q false violates the conditional, and that combination has no integer realization for these predicates. |
| conditional-forms | Original, converse, inverse and contrapositive; the universal integer statements are distinguished from individual truth assignments. Six refutes converse and inverse. |
| conditional-table | Complete derived truth table with P/Q symbols, localized true/false labels and both matching column pairs; compact view scrolls locally. |
| conditional-admission | A ⊆ T ∩ I with ticket-only and ID-only witnesses and room in the intersection outside A; requirements do not become sufficient conditions. |
| conditional-kinds | Exceptionless mathematical implication, a causal mechanism claim and a claim allowing exceptions, retaining the source explanations. |

Semantic HTML and shared tokens preserve text size, theme contrast and responsive layout. The selection is redundantly shown by an outline, weight and explicit selected button. The venue’s inner region is A, explained by a localized label below the diagram; T/I meanings appear in a separate text legend so the ellipse boundaries cannot cross long translated labels on compact screens. The reference screenshots’ yellow highlight is replaced with canonical teal. Six variants and two independent number explorers run in `/library/`.

Pure predicates and row derivation live in `conditional-model.ts`, localized copy in `conditional-copy.ts`, escaped diagram/feedback rendering in `conditional-render.ts`, native controls in `ConditionalLab.astro` and static views in `ConditionalFigure.astro`. Existing lesson sources, Boolean logic components and prior styles are unchanged.

## Verification and limits

`verify-conditionals.mjs` checks independently specified truth vectors, both equivalence pairs, 401 signed integers including zero, direct-proof witnesses, safe-integer input bounds, all eight admission combinations, exact choice bounds and EN/DE mathematical rendering. The admission checks include an allowed visitor with both documents who is not admitted, so the converse is never silently assumed. Full build and browser evidence belongs in `VERIFICATION.md`.

The integer explorer illustrates three cases; it is not a proof by enumeration. The venue is a hypothetical requirement model, not a real admission policy. Passing checks do not certify independent mathematical/translation review, a complete accessibility audit or learner outcomes. This request authorizes local implementation, not commit, push or deployment.
