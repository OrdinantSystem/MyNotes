# AoR 30: counting proofs

This module owns order 30, stable key `proving-by-counting`, source `reasoning-episode-30`, EN/DE content and all counting-specific views. It uses the public module dispatcher through `ReasoningFigure kind="module" module="reasoning-30" figure="…"` and `Interactive kind="module" module="reasoning-30" preset="…" id="unique-id"`.

Eighteen static figures include the handshake graph, endpoint split, both incidence groupings, network interpretations, parity obstruction, unequal multiplicities, complete graph and symmetric matrix. Three activities expose month placement (0–13), regrouping by edge/person, and balanced distribution (N=0–60, k=1–12). Native buttons and number inputs supply pointer, touch and keyboard access, bounded local state, reset and polite feedback. Output is rendered statically before scripts. No timed animation, external answer collection, scoring or persistence is used.

`model.ts` is pure combinatorics. `render.ts` derives representations and localized readouts from its values. `Lab.astro` owns instance-local event state. `style.css` scopes all rules to `.aor30` and uses canonical tokens. No shared registry or global CSS edits are needed. The source screenshots' amber becomes canonical teal; labels preserve distinctions without color alone.

Run `node src/lesson-modules/reasoning-30/verify.mjs` with Node 24 from the application directory. The standard serialized build discovers this verifier, lesson/source/navigation metadata, gallery examples and bilingual content. Stage future modules outside the active discovery directory and use the documented integration lock; never change another module or bypass a live build lock.

The original text, screenshot hashes and source disposition are private. The English narration retains all ten sections with normalized mathematics; production directions become figures. The five supplied worksheet questions remain; missing hints and answers are explicitly identified as additions. Generalized pigeonhole bounds are necessary guarantees, not a description of every category. An even degree sum is necessary, not sufficient for a degree sequence. Review remains unreviewed.

Verification results and limitations: see the module’s `VERIFICATION.md` and `../docs/reasoning-counting.md` from the application root.
