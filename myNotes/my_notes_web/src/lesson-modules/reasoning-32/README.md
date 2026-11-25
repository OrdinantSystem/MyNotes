# Lesson 32: Discover a theorem, then earn it

This module owns order 32, key `discover-a-theorem`, source `reasoning-episode-32`, in Part Four. It can be staged and integrated independently of lessons 29–31. The manifest supplies source, chapter membership, thumbnail and gallery entries through the shared registry; no shared registry file needs editing.

The English narration follows the supplied script. Flattened interface fragments become ten native figures and four activities. Timestamps, video directions, packaging and subjective assessments are not learner instructions. German follows the same mathematical scope. The original and transformation record are preserved privately; no private paths or source attachments are published. Mathematical and translation review remain unreviewed.

## Public representation contract

Use the central registered components:

```mdx
<ReasoningFigure kind="module" module="reasoning-32" figure="inclusion" />
<Interactive kind="module" module="reasoning-32" preset="evidence" id="unique-workshop-id" />
```

`manifest.json` lists the supported figures and presets. `Figure.astro` uses semantic HTML, the shared Math component and a labeled, locally scrollable number-line SVG. `Lab.astro` provides server-rendered initial content and native keyboard controls. Module CSS is scoped to `.aor32` and uses existing tokens. No yellow/amber or new visual system is introduced.

- `evidence`: 1–20; exact positive witnesses, excluding only 1 and 2 by the minimum-sum argument. The unresolved 4, 8 and 16 remain unresolved throughout this activity. Failed enumeration never silently becomes a proof.
- `proof`: integer k from 1 to 10, initially five. Four bounded stages reconstruct the construction and general proof, then move exactly the same statement to established facts. Backtracking restores its earlier status. The complete general proof is also visible in the article.
- `sixteen`: four independent self-report checkboxes, initially empty. No mastery or proof certification is inferred. Hint and complete reference answer are native disclosures. The reference proof covers 2, 3, 4, 5 and at least 6 terms.
- `record`: four labeled local text fields, initially empty, with explicit copy success/failure feedback and reset. No network submission, persistence or collection. Text remains recoverable in the fields if clipboard access fails.

The main investigation proves the odd-number theorem and excludes 1, 2 and 8; some even witnesses disprove equality with the odd set. The classification by powers of two stays a conjecture. The pending tray deliberately makes no membership claim about unresolved numbers. The creator-only classification proof stays outside the public lesson.

## Validation

Run with Node 24 from the application directory:

```sh
node lesson-work/reasoning-32/verify.mjs
npm run lesson:integrate -- lesson-work/reasoning-32
```

Integration copies a complete candidate under the shared process-owned lock and runs the production pipeline. After integration, active sources live in `src/lesson-modules/reasoning-32/`; edit there, leaving other lessons alone. Never overwrite another session's staging directory or delete its lock.

The focused verifier independently enumerates positive witnesses for 1–400, tests exact 15 representations, evidence classifications, minimum-length bounds, k boundaries, reset-related initial values, proof scope at every stage, statement identity and both localized pages' full component coverage. These finite checks do not replace the visible universal proof. Browser and build results are recorded below after execution.

Production, prefix and restored-normal checks and the required final `npm run build` passed on 25 November 2026. Desktop/compact browser checks cover EN/DE and both themes, input boundaries, proof transitions, keyboard controls, local reset, copying, gallery isolation, navigation and production search. See [VERIFICATION.md](VERIFICATION.md) for the actual checks and their limits. The lesson has ten figures and four activities, with a separate normal preview on port 18532 so parallel sessions retain their own previews.
