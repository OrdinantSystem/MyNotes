# Reasoning Episode 13: quantifiers and dependence

`quantifiers-and-dependence` is the fifth Part Two page in EN/DE, order 13, source `reasoning-episode-13`, prerequisite `reasoning-with-switches`. Both pages preserve the complete eleven-section explanation, the real-number argument, nested-negation derivation, existence/uniqueness distinction and reference reading. All 132 preceding MDX sources remain unchanged. Originals, 314 paragraph dispositions and preservation baselines are private and ignored. Publication status does not imply review: both remain unreviewed.

The title and one informal phrase are corrected from “someone knows everyone” to “someone is known by everyone,” matching K(x,y) and every actual quantified claim. Arrow direction is preserved throughout. Self-acquaintance holds only when a loop is drawn. The shared-contact network includes Ben’s loop, required because x and y range over the same three people. The alternative formula excluding x = y remains in the prose. Broken transport escaping in spacing, set braces and the cases environment is repaired; inline emphasis is normalized. Production branding/timing and the editorial teaching summary are omitted; reference URLs omit tracking parameters.

## Reused mathematics and public API

The existing unchanged `analysis-model.ts` supplies `relationSummary` and `quantify`. No new quantifier engine, parser, framework or backend is introduced. `dependence-model.ts` supplies typed three-person relations and the bounded student example. `dependence-render.ts` draws escaped SVG with unique marker IDs and shared MathText; `dependence-copy.ts` localizes all interface copy. The separate `dependence` presentation is needed for a three-person directed graph with loops and a growing named student table; the existing Analysis view has a different fixed row/control contract and remains unchanged.

`Interactive kind="dependence" preset="network|students" id="unique-id"` has these states:

| Preset | Domain and actions | Feedback |
| --- | --- | --- |
| network | Cycle A→B→C→A or shared target A→B, B→B, C→B; select A, B or C with native pressed buttons. Initially cycle, Clara selected. | Selected witness, K pair and full sentence agree with the highlighted arrow. Source is blue, target teal, both roles violet; a textual legend and full SVG relationship description preserve meaning without color. |
| students | Initially Maria solves problem 1 and Noah problem 2. A native button adds/removes Lea, who solves none of the three problems. | Derived universal/existential verdict, Lea as the sole failing row, and the true nested negation when present. Solved/not-solved symbols have a visible localized key. |

Controls remain stable while output updates; keyboard Enter/Space, pointer, reset and a polite localized status announcement are supported. Reset restores the initial state without moving focus. Every instance is independent; the gallery includes a second network. All data stays local with no storage, remote answer collection, score or mastery claim. Static initial SVG/table content renders at build time.

Seven `ReasoningFigure` variants cover `quantifier-symbols`, `dependent-choices`, `quantifier-orders`, `real-choices`, `quantifier-negation`, `existence-counts` and `citation-witnesses`. Native Markdown tables retain the original witness and failing-candidate lists. The real-number proof remains an arbitrary-number argument (y = x + 1 and x = y + 1), without a floating-point simulation masquerading as an infinite proof. Quantifier-negation steps retain order while switching each quantifier and finally negating the predicate. Existence counts 0/1/2 distinguish at least one from exactly one. All variants run in `/library/`.

The book/source challenge stays visible; its supplied countermodel and reference explanation sit inside the existing native `Exercise` disclosure, closed initially. All central explanations and proofs remain visible. Responsive semantic HTML supports readable text; wide tables/formulas scroll locally with keyboard focus. No supplied screenshot is copied into public assets, and its yellow role is replaced by canonical teal.

## Verification and limits

`verify-dependence.mjs` independently enumerates all 512 directed three-person relations, finding 174 order countermodels. It checks common implies separate, impossibility of a literal shared target in an irreflexive same-domain relation, finite nested negation including empty domains, exact cycle/shared witnesses, Lea’s sole failing row, citation witnesses, existence counts, invalid states and EN/DE rendering. The UI exposes only its stated nonempty domains. Full production and prefix builds, browser behavior/layout, source preservation and exact generated counts are recorded in `VERIFICATION.md`.

Finite checks exhaust these modeled networks; they do not establish facts about real acquaintance, independent editorial/translation review, a complete accessibility audit or learning outcomes. The real-number claim is justified by the retained proof. Content implementation does not authorize commit, push or publication.
