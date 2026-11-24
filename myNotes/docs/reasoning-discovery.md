# Reasoning Episode 17: finding the next proof step

`finding-the-next-proof-step` is the first Part Three lesson in English and German, order 17, source `reasoning-episode-17`, prerequisite `what-makes-a-proof`. All eight source sections remain: even-plus-odd intuition, backward goal analysis, forward deductions and integer witness, circularity warning, finished proof, logical goal structure and scope, practice, false universal claim, and the distinction between finding, writing and understanding proofs. Both editions remain unreviewed.

The ignored private source directory retains the original, a 320-block disposition ledger, prior-lesson hashes and shared-source baselines. Production branding, timings and the editorial change log are omitted. The supplied practice widget contains only one of four promised questions, the square-49 existence question. Three added questions cover conjunction, universal quantification and implication; each is visibly labeled as additional practice. Optional reference openings explain all four. Initial parity values are 4 and 5 to match the narration, rather than the screenshot's transient 2 and 5. Publisher contents and the linked Open Logic text were checked.

## State and mathematics

`discovery-model.ts` reuses the unchanged even-sum model and safe-integer validation. General witnesses are signed integers: e = 2a, o = 2b+1, k = a+b and e+o = 2k+1. The physical display uses only even selections 2, 4, 6, 8 and odd selections 1, 3, 5, 7. Those finite positive examples illustrate the pattern; the visible arbitrary-integer proof covers the full theorem. Existing complete pairs remain complete; exactly one leftover remains. Input colors persist in the combined view, with explicit labels and a numerical/formula readout.

The five workspace states separate given assumptions, the backward existential target, forward definition expansion, the algebraic connection, and the verified witness. Only the final state marks the goal established. An existential target is never presented as a known fact. Back is disabled initially, Next becomes Replay at the final stage, and Reset returns to the initial state. The complete proof and central explanations remain visible in the article independently of the activity.

The branch figure takes an arbitrary integer outside the temporary evenness assumption. Inside that boundary, n = 2r yields two separate obligations: n² = 2(2r²) and n+2 = 2(r+1), with integer witnesses stated. Closing the temporary assumption establishes the conditional, not unconditional evenness. Dependent witness examples choose m = n+1 after n; they do not assert one fixed maximum integer. The circularity figure states the missing integer-domain condition rather than declaring the fraction itself invalid.

## Public representations

`Interactive kind="discovery" preset="parity|workspace|practice" id="unique-id"` provides native finite buttons, step controls, or initially unanswered radios with immediate explanatory feedback. Practice navigation preserves answers within one instance; reset clears all answers, returns to question one and closes the optional reference disclosure. No scores, submissions, storage or mastery inference are added. Stable controls retain keyboard focus. Plain-language status uses a polite live region. All initial diagrams and complete reference openings render server-side; without JavaScript all four practice questions remain available.

`ReasoningFigure kind="discovery-have-goal|discovery-backward|discovery-match|discovery-directions|discovery-circular|discovery-branches|discovery-rules|discovery-dependence|discovery-counterexample|discovery-abilities"` uses semantic HTML, Math/MathText and token styles. Two-column panels and branches stack on compact screens; wide formulas scroll locally. The four goal transformations are a semantic table with all four rows, including conjunction. These are planning patterns, not a guaranteed proof algorithm.

Mathematical state, localized teaching copy, escaped rendering, native controller and styles are separate. Display math reuses the restricted justification renderer; no new engine, framework, dependency or bitmap asset is introduced. All three activities, ten figures and a second independent workspace run in `/library/`.

## Verification and limits

The mandatory `verify-discovery.mjs` checks 10,201 signed witness pairs, all 16 finite selections in both languages, 201 branch/successor samples, five workspace states and navigation, every practice answer, invalid bounds, independent defaults and restricted localized math rendering. Production, prefix, browser and preservation evidence belongs in `my_notes_web/VERIFICATION.md`.

Finite checks validate the implementation; the visible arbitrary-integer argument supplies the general proof. Build and browser checks do not establish independent mathematics/translation review, complete accessibility certification or learning outcomes. This content task does not authorize commit, push or deployment.
