# Reasoning 31 — Pairing things to prove things

This bundle owns order 31, source `reasoning-episode-31`, English/German key `pairing-things-to-prove-things`, and the Part Four navigation entry. It uses the existing module dispatcher. All implementation, content and verification files stay in this folder. No shared registry edit is needed.

Author in `lesson-work/reasoning-31/`. Integrate once with Node 24 from the application directory: `npm run lesson:integrate -- lesson-work/reasoning-31`. The shared build lock serializes activation and production checking; never manually remove another session's lock. Once integrated, make corrections in the active module only. Do not run the integrate command again over an existing module.

## Source and teaching contract

The exact supplied script, ten supplied screenshot references, original lesson hashes and a source-block SHA-256 ledger are private under the source identity. They are not public assets. The eight script sections retain the function rule, both injectivity formulations, quantified surjectivity, finite cardinality inequalities, general affine injectivity proof, zero counterexample, arbitrary odd-target proof, complete subset injection/surjection proofs, three repair situations and infinity teaser. The English script keeps its teaching prose with small context bridges where animation directions were removed. German translates the teaching content. The mathematical reference, misconceptions and earlier-concept connections become a learner reference. Timings, animation directions, editorial ratings, and production/source commentary remain private.

The source's golden square is teal in the canonical palette; an explicit figure note explains the correspondence. `g` is still the designated element. Domain/input elements are blue; targets are teal; collisions use coral and explicit shared labels; unreachable targets use dashed outlines and labels. Labels, not color alone, communicate the properties.

## Components and state

Use `ReasoningFigure kind="module" module="reasoning-31" figure="…"` for the eleven manifest figures and `Interactive kind="module" module="reasoning-31" preset="lockers|codomain|subsets" id="unique-id"` for activities. The module is discovered by navigation, source catalog, thumbnails, content loading, the library gallery and production verification.

- `lockers`: native selects assign each of 3, 4 or 5 students to exactly one of four lockers. The initial four-student state is `[0,2,2,3]` with zero-based targets. Properties, collision/unused counts and feasibility feedback derive from the assignment. Changing student count selects a separate situation, not a permitted repair within one situation. Reset returns to the initial four-student state.
- `codomain`: inspect integer targets −12…12. The exact preimage is `(y−1)/2`. An even number is an unreachable designated target for ℤ, and outside the codomain when only odd integers are designated. No bounded test is presented as a universal proof. The general argument stays visible in prose. Reset restores target zero and the all-integers codomain.
- `subsets`: two checkboxes choose the triangle/circle membership mask; adding/removing the designated square preserves those choices. Direction buttons show the inverse correspondence without an automatic animation. Reset gives the empty source subset and forward direction.

All initial drawings and feedback render at build time. Native controls work with keyboard and pointer, retain focus during changes and provide local polite status feedback. Instances are independent, including two locker explorers in the gallery. No submission, score, storage or dependency is added. Mathematical model, localized copy, rendering and browser control are separate. SVG maps show the complete assignment on desktop; compact screens use labeled HTML mapping rows so both ends of each arrow remain readable. Subset rows stack with the corresponding arrow direction.

`verify.mjs` exhaustively checks finite functions up to five inputs/targets, the empty-set cases, equal-size injection/surjection equivalence, 24 four-element bijections, the one-change repair, invalid states, integer preimages, signed affine examples and subset inverse properties. General proofs remain distinct from these finite checks. `VERIFICATION.md` records actual build and browser results. Both language editions remain `unreviewed`; automated checks do not certify independent mathematical or native-language review. Git writes and publication require separate authorization.
