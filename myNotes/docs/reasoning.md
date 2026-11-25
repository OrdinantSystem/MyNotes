# The Art of Reasoning

Episode 20 adds `proof-by-contradiction`, three `Interactive kind="contradiction"` presets and twenty-four `ReasoningFigure` variants. Part Three contains 17–20. See [reasoning-contradiction.md](reasoning-contradiction.md) for source coverage, Euclid construction and input/state contracts.

Episode 19 adds `proof-by-contraposition`, three `Interactive kind="contraposition"` presets and eighteen `ReasoningFigure` variants. Part Three now contains 17–19. See [reasoning-contraposition.md](reasoning-contraposition.md) for source coverage, truth/geometry/strategy contracts and bounds.

Episode 18 adds `proof-by-cases-and-equivalence`, six `Interactive kind="cases"` presets and twenty-five `ReasoningFigure` variants. Part One contains orders 1–8, Part Two 9–16, and Part Three 17–18. Lesson 17 keeps its URL and body; only its chapter metadata changes. See [reasoning-cases.md](reasoning-cases.md) for the source, mathematical and state contracts.

Episode 17 adds `finding-the-next-proof-step`, three `Interactive kind="discovery"` presets and ten `ReasoningFigure` variants. It is the first lesson in Part Three (corrected at the owner’s request with Episode 18). See [reasoning-discovery.md](reasoning-discovery.md) for signed witnesses, goal/assumption scope, source additions and local-state contracts.

Episode 16 adds `what-makes-a-proof`, three `Interactive kind="justification"` presets and seven `ReasoningFigure` variants, including existing Flow for the repair. All run in the gallery with a second independent representation activity. See [reasoning-justification.md](reasoning-justification.md) for the source, parity/domain, dependency and state contracts.

Episode 15 adds the bilingual `equivalence-relations` lesson, three `Interactive kind="equivalence"` presets and eleven `ReasoningFigure` variants. All run in the gallery, including a second independent sorting instance. See [reasoning-equivalence.md](reasoning-equivalence.md) for source mapping, exact integer predicates, proofs, state/reset and verification contracts.

The `reasoning` course belongs to the Reasoning area (`thinking`), separate from Mathematics. Its scope can grow into philosophy and psychology. It shares the existing application, route helpers, navigation colors and EN/DE shell. `reasoning-part-one` is a native expandable chapter with direct lesson links, selected through the optional chapter `directLessons` flag; other courses retain their hierarchy.

Part One contains eight pages in EN/DE: `one-plus-one` (order 1), `letters-and-relationships` (order 2), `equality-and-solutions` (order 3), `pictures-and-proofs` (order 4), `patterns-and-predictions` (order 5), `counterexamples-and-claims` (order 6), `testing-competing-explanations` (order 7), and `truth-validity-and-soundness` (order 8). English routes begin `/reasoning/lessons/`; German equivalents begin `/de/reasoning/lessons/`. Prerequisites remain course-local; previous/next navigation follows the complete published order; all share the direct Part One branch and previous/next navigation. Its separate text source identity is `reasoning-episode-02`; see [the Episode 02 source and model contract](reasoning-algebra.md). The third uses `reasoning-episode-03`; see [the equality and transformation contract](reasoning-equations.md). The fourth uses `reasoning-episode-04`; see [the pictures and general proof contract](reasoning-proofs.md). The fifth uses `reasoning-episode-05`; see [the patterns, predictions and evidence contract](reasoning-patterns.md). The sixth uses `reasoning-episode-06`; see [the counterexamples and claim-type contract](reasoning-counterexamples.md). The seventh uses `reasoning-episode-07`; see [the competing explanations and informative tests contract](reasoning-inquiry.md). The first page uses `reasoning-episode-01` and its expanded source below. Private originals, checksums and transformation notes live in ignored `references/source/` folders for each identity.

Part Two (`reasoning-part-two`, EN “Part Two”, DE “Teil Zwei”) begins with `belief-and-logical-structure`, order nine, prerequisite `truth-validity-and-soundness`, source `reasoning-episode-09`. It is a separate native expandable chapter with direct lessons, following the existing eight-page Part One. Register each real lesson as supplied rather than adding empty routes. See [the argument structure and belief-bias contract](reasoning-arguments.md).

The second Part Two page is `words-meanings-and-evidence`, order 10, source `reasoning-episode-10`, after `belief-and-logical-structure`. It retains eight sections and adds linked mean/majority/median exploration, threshold and language examples. See [the language and interpretation contract](reasoning-language.md).

The sixth Part Two page is `sets-and-mathematical-worlds`, order 14, source `reasoning-episode-14`. The complete eight-object universe supports membership, inclusion, operations, empty sets and a separate red-square countermodel. See [the source and representation contract](reasoning-worlds.md).

The fifth Part Two page is `quantifiers-and-dependence`, order 13, source `reasoning-episode-13`. Directed acquaintance networks, changing versus shared witnesses, real-number transfer, nested negation and a citation countermodel retain the complete eleven-section explanation. See [the quantifier source and representation contract](reasoning-dependence.md).

The fourth Part Two page is `reasoning-with-switches`, order 12, source `reasoning-episode-12`. It retains all ten sections, derives Boolean series/parallel circuits from shared inputs, distinguishes negation scope, proves both De Morgan relationships and simplifies the implemented rule to P. See [the switch source and representation contract](reasoning-switches.md).

The third Part Two page is `implication-and-its-converse`, order 11, source `reasoning-episode-11`, after `words-meanings-and-evidence`. It retains the eight-section explanation and direct integer proof, with three inspectable numbers, conditional forms, a derived truth table and admission requirements. See [the conditional source and representation contract](reasoning-conditionals.md).

The initial edition preserved the supplied English explanations verbatim. The owner's follow-up explicitly authorizes a seamless expansion on the same page: retain effective explanations, make small editorial improvements, and remove redundant presentations. The original English/German lesson snapshots and both supplied sources are preserved privately. The expanded script has its own `reasoning-episode-01-expanded` source identity in additionalSources; it contributes sets, cardinality, one-to-one correspondence, union/intersection, nested sets, addition as a function, equality properties and the sports transfer question. EN/DE keep matching identities and mathematical content.

Video timings, animation directions, promotional branding and production notes are source artifacts, not learner-facing instructions. The earlier 11-minute label and timing lines are removed because they no longer describe the expanded page. Central explanations remain visible; reference answers stay in native disclosures. Legacy section fragments remain as explicit anchors when headings are renumbered. Publication status only controls local/static availability; reviewStatus remains unreviewed and does not authorize Git writes or deployment.

## Representation specification

Existing vector and Analysis engines cannot express changing a counting unit or merging physical objects. A small finite-comparison family is appropriate; it adds no dependency or continuous simulation. It reuses the shared Interactive dispatcher, semantic colors, native buttons, figure conventions and Flow renderer.

- `Interactive kind="reasoning" preset="appearance|units|water" id="unique-id"` supports three independent finite comparisons. Appearance has identical/colors/sizes states; the count remains two. Units counts the same matched shoes as two shoes or one pair. Water has separate/merged states: two drops become one; 5 + 5 hundredths of a milliliter remain 10 hundredths, assuming no loss.
- The pure `reasoning-model.ts` validates supported states and derives counts/volume. `reasoning/copy.ts` supplies EN/DE controls, accessible descriptions and state-derived numerical readouts. Unknown choices are rejected. There are no arbitrary numeric inputs, dragging, empty collections, impossible targets, or physical fluid dynamics in this bounded comparison.
- All initial content and alternate drawings render at build time. Native buttons support pointer, touch, Tab, Enter and Space, preserve focus and expose pressed state. Reset restores the first choice; each instance owns its state. A polite live region describes the result. Controls are at least 44px high. No timed animation, external answers, scores, or storage are involved.
- `ReasoningFigure kind="opening|collections|objects|singleton|singletons|matching|addition|overlap|pairs|function|symbols|process"` provides localized code-native visuals. Named objects, singleton boundaries, the complete matching, disjoint union, overlapping people, nested shoe pairs and addition input/output diagrams use the same finite example data as their mathematical readouts. The process variant supplies five localized nodes and TeX to the existing Flow view. No screenshots or private source files are published. Teal/blue colors follow the canonical palette; the revised prose names the diagram colors consistently.
- All three comparisons and twelve static variants run in `/library/`. The library test checks invariant cardinality, unit conversion, conserved volume, invalid states and localized numerical feedback, plus all 256 pairs of subsets of a four-element universe for inclusion/exclusion, complete/incomplete/noninjective matchings, nested units and addition examples. The finite figures are static comparisons; no automatic animation or new browser controller is needed. Browser QA covers both languages/themes, desktop/compact layouts, keyboard selection/reset, state isolation, navigation, search and prefixed routes.

The pictures illustrate the stated model; they are not a formal proof of arithmetic or a quantitative fluid simulation. No mathematical or native-language expert review is claimed.

## Existing review preservation

Four shared presentation dependencies receive additive Reasoning branches/examples: Interactive, the asset catalog, the route's course thumbnail choice and singular lesson counts, and the library. `reasoning-shared-extension.json` records their complete before/after hashes and exact reversible source blocks. `reasoning-extension.mjs` validates the active versions and reconstructs each complete original before the unchanged Analysis review gate runs. Negative fixtures reject unrecorded edits. The original review receipts and Analysis lesson sources remain unchanged; the new extension is not represented as independently reviewed Analysis teaching.

## Expanded source mapping

| Expanded script | Integrated lesson destination |
| --- | --- |
| 1–2: abstraction and units | Existing sections 1–3; retained effective explanations, clarified quantity/unit distinction |
| 3: objects, set notation and membership | Section 4; named objects, singleton and two-set figures, element versus singleton |
| 4: cardinality and one-to-one matching | Section 5; complete matching and careful rebinding of A/B for the three-element example |
| 5: union, intersection and disjointness | Section 6; replaces the shorter set sketch, explains inclusion/exclusion through Alex/Sam/Jo and the empty set |
| 6: sets of sets and counting units | Section 7; four shoes versus two matched inner sets, distinction between a set and a unit |
| 7: addition as a function | Section 8; exactly one output, binary operation, ordered pairs and Cartesian product, nonnegative domain including zero |
| 8: water and physical change | Existing water section, now 9; preserved core explanation and clarified the additive-volume assumption |
| 9: equality | Existing symbol section, now 10; retained numeral/expression/equation explanation, added equality properties and equal cardinality versus set equality |
| 10: synthesis and sports question | Sections 11–12 and final checkpoint; retained practice, added the missing-overlap transfer question and five-step structure diagram |

An ordered pair is distinguished from a set with repeated listings. The general function rule is distinguished from the stricter perfect matching of a bijection. These small connective explanations avoid introducing new notation without an interpretation.

## Collection and symbol layout

The outer figure keeps its variant hook (`reasoning-collections` or `reasoning-symbols`) and ordinary block flow. Only the inner `reasoning-collection-items` / `reasoning-symbol-items` container gets grid layout: three evenly spaced collections or five equation symbols in one row. Do not reuse an outer variant class as an inner layout class; doing so puts the caption into a grid column and lets a cell rule override the nested symbol grid. Captions occupy the full figure width below the diagram. Compact symbol rows use all available column width for the longer German labels.

## Episode 08: truth, validity and soundness

`truth-validity-and-soundness` is one EN/DE page in the existing direct Part One branch, using order 8 to retain the supplied episode identity. It follows the counterexample lesson as its current prerequisite; order 7 is not invented from missing source material. The course remains interdisciplinary. Source `reasoning-episode-08` records sections 1–8, the learning checkpoint and references. The private original and integration ledger are under `references/source/reasoning-episode-08/`.

The supplied English explanations retain their wording and order, including the four argument cases, the unknown-premise example, the deductive/inductive distinction, checkpoint and closing visual-development note. Script branding, duration and timestamps are production artifacts. Transport-escaped TeX delimiters become native mathematics. Original choice/figure text is rendered by shared components at its original position. Added feedback, reference answer and palette note are explicitly labeled. The original word “golden” is retained; its diagram region uses canonical teal, with an adjacent explanatory note. German translates the complete teaching content. Both editions remain unreviewed; checks do not claim expert translation review.

`ReasoningFigure` adds ten `validity-*` variants: the opening square, argument bridge, nested regions, two implications, validity test, comparison, four-case grid, soundness gates and truth/justification distinction. `Interactive kind="validity" preset="opening|countermodel|warning" id="unique-id"` uses bounded native buttons with reset, pressed state and local live feedback. In the countermodel, S/R geometry and truth rows change together; both premises remain true while the conclusion changes. Exhaustive Boolean assignments establish the distinction between forward inference and affirming the consequent independently of the pictured actual shape. A valid argument with a false first premise is kept distinct from a sound argument. There is no grading, submission, numeric input, dragging or timed animation. The initial figure and central explanation render without JavaScript. `/library/` demonstrates every preset and figure.


Episode 21 adds `existence-and-uniqueness`, three `Interactive kind="uniqueness"` presets and eighteen `ReasoningFigure` variants. Part Three contains 17–21. See [reasoning-uniqueness.md](reasoning-uniqueness.md) for source coverage, arbitrary-pair and empty-set boundaries, and state contracts.


Episode 22 adds `mathematical-induction`, three `Interactive kind="induction"` presets and twenty `ReasoningFigure` variants. Part Three contains 17–22. See [reasoning-induction.md](reasoning-induction.md) for source coverage, arbitrary-step and base/domain boundaries, and activity contracts.


Episode 23 adds `auditing-a-proof`, three `Interactive kind="audit"` presets and twenty-two `ReasoningFigure` variants. Part Three contains 17–23. See [reasoning-audit.md](reasoning-audit.md) for source coverage, diagnostic distinctions, first-invalid-step and exact graph contracts.


Episode 24 adds `understanding-and-independent-reasoning`, three `Interactive kind="transfer"` presets and eighteen static variants (seventeen used in the lesson; the calibration graphic is part of its activity). Part Three contains 17–24. See [reasoning-transfer.md](reasoning-transfer.md) for source, prediction timing, local response and calibration boundaries.


Episode 25 adds `making-progress-when-stuck`, order 25 and the first lesson of Part Four / Teil Vier (`reasoning-part-four`). Parts One, Two and Three retain 1–8, 9–16 and 17–24. Ten teaching sections, nineteen lesson figures, two complete attempt logs and three `Interactive kind="triangle"` presets retain the triangle investigation and target-8 impossibility proof. See [reasoning-triangle.md](reasoning-triangle.md) for injective placement, double counting and necessary-versus-sufficient conditions.


Episode 26 adds `changing-representations`, order 26 in Part Four / Teil Vier (25–26). Ten teaching sections, nineteen native figures, three `Interactive kind="reframe"` presets, complete rearrangement and induction proofs, the overlap warning and handshake transfer preserve the supplied script. A promised but absent example proof is an explicit addition. See [reasoning-representations.md](reasoning-representations.md) for identity-preserving transformations, count recovery and source boundaries.


Episode 27 adds `inventing-a-lemma`, order 27 and the third lesson in Part Four / Teil Vier (25–27). Ten teaching sections, fourteen native figures and three `Interactive kind="lemma"` presets retain the independently proved parity lemma, full signed-integer divisibility proof, accessibility/sufficiency distinction, false factor-cancellation counterexample and four-choice odd-square transfer with complete proof. See [reasoning-lemmas.md](reasoning-lemmas.md) for the candidate/proved/conclusion scopes and source boundaries.


Episode 28 adds `strong-induction`, order 28, fourth lesson of Part Four / Teil Vier (25–28). Nine teaching sections, nineteen figures (eighteen new variants and the reused induction dominoes), three local activities and three reasoning questions preserve strong induction, the complete prime-factorization existence proof, strict-descent termination, smallest counterexamples, the positive-real boundary and the cumulative Q(k) reduction. Two missing source questions and all hints/reference answers are explicit additions. See [reasoning-strong-induction.md](reasoning-strong-induction.md).

Episode 29 adds `invariants-and-monovariants` in EN/DE, order 29 in Part Four. Its four activities, fourteen figures, complete chessboard impossibility proof and termination boundaries live in `src/lesson-modules/reasoning-29/`. Read its README for source and state contracts. Later episodes can register independently using [parallel-lessons.md](parallel-lessons.md); no placeholder lessons are added.
