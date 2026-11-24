# myNotes

myNotes is a static, multilingual university learning archive. Its approved design is canonical. The application is **my_notes_web/**, renamed from test on 2 November 2026; there is one implementation.

## Start here

| Task | Read |
| --- | --- |
| Any change | [AGENTS.md](AGENTS.md), then [design system](DESIGN-SYSTEM.md) |
| Run, build, or preview | [Application README](my_notes_web/README.md) |
| Understand the source and rendering flow | [Architecture](docs/architecture.md) |
| Maintain Analysis I | [Course organization](docs/analysis-organization.md), [teaching provenance](docs/analysis-zero.md), [coverage ledger](docs/analysis-zero-coverage.json) |
| Import another PDF/worksheet | [Source ingestion](docs/source-ingestion.md) |
| Maintain The Art of Reasoning | [Course and source contract](docs/reasoning.md), [Episode 02 models](docs/reasoning-algebra.md), [Episode 03 equations](docs/reasoning-equations.md), [Episode 04 proofs](docs/reasoning-proofs.md), [Episode 05 patterns](docs/reasoning-patterns.md), [Episode 06 counterexamples](docs/reasoning-counterexamples.md), [Episode 07 inquiry](docs/reasoning-inquiry.md), [Episode 09 argument structure](docs/reasoning-arguments.md), [Episode 10 language and meaning](docs/reasoning-language.md), [Episode 11 conditionals](docs/reasoning-conditionals.md), [Episode 12 switches](docs/reasoning-switches.md), [Episode 13 quantifiers](docs/reasoning-dependence.md), [Episode 14 mathematical worlds](docs/reasoning-worlds.md), [Episode 15 equivalence](docs/reasoning-equivalence.md), [Episode 16 proof structure](docs/reasoning-justification.md), [Episode 17 proof discovery](docs/reasoning-discovery.md), [Episode 18 cases and equivalence](docs/reasoning-cases.md), [Episode 19 contraposition](docs/reasoning-contraposition.md), [Episode 20 contradiction](docs/reasoning-contradiction.md), [Episode 21 existence and uniqueness](docs/reasoning-uniqueness.md), [Episode 22 induction](docs/reasoning-induction.md), [Episode 23 proof auditing](docs/reasoning-audit.md), [Episode 24 independent reasoning](docs/reasoning-transfer.md), [Episode 25 making progress](docs/reasoning-triangle.md), [Episode 26 representations](docs/reasoning-representations.md), [Episode 27 lemmas](docs/reasoning-lemmas.md) |
| Write or correct a lesson | [Authoring](docs/authoring.md) |
| Add or reuse a visual/interaction | [Representation library](docs/representation-library.md) |
| Review the Analysis visual teaching pass | [Lesson audit and interaction specifications](docs/analysis-visuals.md) |
| Maintain first-semester Analysis refinements | [Active teaching and preservation contract](docs/analysis-teaching.md) |
| Reuse the Analysis I improvement process | [Teaching improvement history and method](docs/history/analysis-i-teaching-retrospective.md) |
| Maintain Learning & Teaching or reuse its EGM pass | [Active methodology guide](docs/learning-teaching.md), [audit, reviews and retrospective](docs/egm/learning-teaching/retrospective.md) |
| Change navigation, themes, search, or deployment | [Development](docs/development.md) |
| Resume in a future session | [Project context](docs/context.md) |
| Understand prior decisions | [Decisions](docs/decisions.md), [Brilliant research](docs/interactive-learning-analysis.md) |
| Check what was verified | [Verification record](my_notes_web/VERIFICATION.md) |

From this directory, using Node 24:

```sh
cd my_notes_web
npm ci
npm run build
npm run preview
```

Open [myNotes](http://127.0.0.1:4321/) and the working [representation library](http://127.0.0.1:4321/library/). Search is generated during the production build. The developer gallery is English-only and excluded from lesson search and navigation.

## Structure

```text
myNotes/
  AGENTS.md                 # Rules for all work here
  DESIGN-SYSTEM.md          # Approved visual and teaching contracts
  README.md                 # Documentation entry point
  docs/                     # Architecture, authoring, assets, workflow, context
  my_notes_web/             # Canonical executable application
    AGENTS.md
    README.md
    src/content/lessons/{en,de}/
    src/components/         # Teaching views and MDX registration
    src/components/interactive/
    src/lib/interactive/    # Pure primitives, models, presets, catalog
    src/layouts/
    src/styles/
    src/pages/
    scripts/
    templates/
    deployment/             # Inactive GitHub Pages workflow template
    previews/
```

Astro generates HTML from MDX; KaTeX renders mathematics; Pagefind builds language-specific search. Small native browser components handle optional interactions. There is no application backend or visitor submission service.

The archive contains Mathematics (Linear Algebra I: 17 lessons; Analysis I: 20 core lessons across six sections plus one Second Exam Prep lesson), Learning & Teaching (learning methodology: 17 lessons), and Reasoning (The Art of Reasoning: eight lessons in Part One, eight in Part Two, eight in Part Three and three in Part Four), each in English and German. The Analysis 0 migration accounts for 52 authored source lessons and 28 linked concepts through consolidated teaching, not a second application; the former 53-page edition is preserved outside the content loader and old URLs resolve through compatibility aliases; see [its guide](docs/analysis-zero.md). Courses, source documents, chapters, localized routes, and course-local prerequisites/orders have validated identities. See docs/source-ingestion.md before extending the archive. Mathematical and translation review remains separate from design approval. Automatic Pages publishing is configured by the repository-root .github/workflows/mynotes-pages.yml workflow. Earlier sites and private source material remain preserved.

The [original plan](docs/history/original-plan.md) is historical context, not an alternate implementation specification.

For learning-method content, transcript coverage, and process-diagram APIs, see [docs/learning-teaching.md](docs/learning-teaching.md).
