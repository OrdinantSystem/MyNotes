# Reasoning Episode 18: cases and both directions

`proof-by-cases-and-equivalence` is order 18 in English and German, source `reasoning-episode-18`, prerequisite `finding-the-next-proof-step`. At Jean’s explicit correction, Part Three contains lessons 17–18; Part Two ends at 16. Lesson 17 retains its URL and body, with only chapter metadata changed. Both new editions remain unreviewed.

All nine source sections, five worksheet exercises and eight self-review prompts are retained. The ignored private record contains the exact source, checksum, 442-block disposition ledger, earlier lesson hashes and protected shared-file baselines. Production preamble, branding, timings, editorial intentions and the mastery counter are omitted. Worksheet reference solutions 2 and 5 were empty in the source; the added solutions are explicitly labeled. Both product witnesses receive explicit integer-closure checks. The odd-square area illustration is qualified as positive geometry, while its algebra covers all signed integer witnesses.

## Mathematical contract

The product proof treats n = 2k and n = 2k+1 as independent branches. The witnesses are k(2k+1) and (2k+1)(k+1), each an integer. A completed first branch does not establish the universal claim. Integer division supplies exhaustive coverage, including negative integers and zero. Positive/negative cases omit zero; overlapping nonpositive/nonnegative cases cover zero twice and remain valid.

The square equivalence requires both implications. Direct expansion proves even input implies even square. The odd-square expansion has one corner after an even central square and two even strips. Algebra gives n² = 2(2k²+2k)+1. Thus an even square rules out odd input, proving the reverse implication by contraposition. The reverse arrow remains marked as an obligation until that argument is supplied. The proposed incomplete proof remains visibly labeled as an argument to inspect; a true conclusion alone does not validate it.

The three-case product uses Euclidean remainders 0, 1 and 2, selecting factors n, n+2 and n+1 respectively. A factor divisible by three makes the product divisible by three because all other factors are integers. The general worksheet solution selects offset zero when the remainder is zero, otherwise m−r; it checks the offset lies among 0…m−1 and handles m=1. Absolute-value cases use x≥0 and x<0 over the reals, with equality at zero. The integer coverage exercise n≤3 or n≥4 is exhaustive specifically because its domain is the integers.

## Reuse and public representations

`cases-model.ts` reuses the unchanged Euclidean remainder and Boolean implication functions. BigInt intermediates preserve exact signed products before safe-number validation. New typed state is justified by multiplicative case witnesses and square-region geometry, which the additive pair and linear discovery activities do not express. Restricted display rendering reuses `justificationMath`; semantic panels and pair glyph styles reuse the existing discovery presentation. There is no new framework, dependency, parser, submission service or general proof engine.

`Interactive kind="cases" preset="consecutive|odd-square|inspection|triples|factors|coverage-practice" id="unique-id"` has six presets:

| Preset | State and behavior |
| --- | --- |
| consecutive | Initial 7; numeric input and minus/plus controls from −12 to 12. A nine-value strip highlights n and n+1, shows parity, exact product and integer quotient. |
| odd-square | Initial side 7; native range and number controls choose 3,5,7,9,11. Grid cells, region areas and equation derive from one side length. |
| triples | Initial 6; the same signed controls highlight three consecutive factors and derive all Euclidean remainders, the divisible factor, product and quotient. |
| inspection | Four initially unanswered options diagnose the missing converse in a true equivalence claim. |
| factors | Three independent, initially unanswered radio groups identify the divisible factor in each symbolic remainder case. |
| coverage-practice | Four independent, initially unanswered exhaustive/not-exhaustive judgments, with explanations of zero, overlap and integer endpoints. |

Finite controls bound illustrations, not the theorems. Valid numeric input updates immediately. Invalid/incomplete input preserves the last valid model and restores it on blur or Enter, with explanatory status. Native arrows, Space/Enter and pointer controls work; outputs change without replacing controls. Reset affects only the current instance, restores initial numbers, clears answers/feedback and closes optional reference disclosures. State stays local, with no score, storage, answer collection or mastery claim. The initial figures and reference reasoning render server-side. Self-review uses the existing native checkbox checklist with reset.

Twenty-five `ReasoningFigure` kinds use the `cases-` prefix: parity, possibilities, routes, workspace, even-pairs, even-match, odd-successor, completed, missing-zero, coverage, logic, square-samples, properties, forward, reverse, square-workspace, even-square, reverse-workspace, eliminate-before, eliminate-after, equivalence, three-branches, architecture, divisibility and absolute. Branches use labeled semantic sections, with witnesses inside their own branch. The coverage bands are schematic. SVG supplies square grids and a scaled absolute-value graph; the latter distinguishes solid absolute value from dashed identity. Labels, equations and prose carry meaning independently of color. Compact branch panels stack, while integer strips and wide formulas scroll locally. All variants and a second independent explorer run in `/library/`.

## Verification and limits

`verify-cases.mjs` checks 2,002 signed consecutive products, 402 branch/square witness instances, all eight logical valuations, 25,025 general remainder offsets, zero/coverage endpoints, every finite grid and question choice in EN/DE, invalid inputs and independent defaults. JavaScript negative zero is compared by mathematical value in the direct product check. Production, browser, prefix and preservation observations belong in the application verification record.

Finite checks verify implementation. The visible arbitrary-integer proofs establish the general mathematical reasoning. No independent mathematics/translation review, full accessibility certification or learning-outcome validation is implied. Git writes and deployment remain separately authorized operations.
