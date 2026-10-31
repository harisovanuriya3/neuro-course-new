# Safe integration inventory — 2026-11-01

This is a staging-only inventory. Do not deploy until content is reconciled and CI succeeds.

Existing published course content must be preserved. Do not blindly merge overlapping PRs.

| PR | Subject | Initial status |
|---|---|---|
| #37 | Integration staging: preserve modules 16–25 and final exam/media before release | Pending comparison with main and content validation |
| #36 | Integrate 25-module final exam with shared media library and QA | Pending comparison with main and content validation |
| #35 | Module 25: trilingual neuroplasticity and neuropathophysiology expansion | Pending comparison with main and content validation |
| #34 | Module 24: trilingual sleep circadian and neurohumoral physiology expansion | Pending comparison with main and content validation |
| #33 | Module 23: trilingual learning memory language and behavior expansion | Pending comparison with main and content validation |
| #32 | Module 22: trilingual autonomic physiology and expanded assessments | Pending comparison with main and content validation |
| #31 | Module 21: special senses theory, clinical cases and assessments in RU EN KZ | Pending comparison with main and content validation |
| #30 | Module 20: expanded trilingual visual physiology theory | Pending comparison with main and content validation |
| #29 | Module 19: trilingual somatosensory theory, clinical cases and expanded assessments | Pending comparison with main and content validation |
| #28 | Module 18: cortical physiology, clinical cases, assessment and localization lab | Pending comparison with main and content validation |
| #27 | Module 17: trilingual amygdala and emotional memory theory expansion | Pending comparison with main and content validation |
| #26 | Module 16: trilingual limbic system theory and clinical practice draft | Pending comparison with main and content validation |
| #25 | Module 15: trilingual hypothalamus theory and interactive homeostasis lab | Pending comparison with main and content validation |

## Acceptance gates

- Compare each candidate file with main and staging; keep existing lessons, labs, images, links and tests.
- Review RU, EN, KZ completeness and clinical/scientific correctness.
- Check unique IDs, assessment answers, route reachability and duplicate content.
- Run full course audit, TypeScript and production build.
- Publish only after checks succeed and visual/mobile review is complete.

## File-level comparison against main (2026-11-01)

Compared PR heads #25–#37 against main using GitHub commit comparison. Every candidate diverges from main, so blind merges are unsafe.

| PR | Ahead / behind main | Distinctive pending content |
|---|---|---|
| 25 | 10 / 2 | Module 15 theory, pretest, standalone homeostasis lab |
| 26 | 26 / 2 | Module 16 theory, questions, assessment, visual and lab |
| 27 | 13 / 2 | Module 17 theory, pretest, final test, activities and lab |
| 28 | 15 / 2 | Module 18 theory, cases, tests and cortical lab |
| 29 | 8 / 2 | Module 19 theory, cases and tests |
| 30 | 10 / 2 | Module 20 visual theory, pretest, activities and assessment |
| 31 | 10 / 2 | Module 21 theory, cases and tests |
| 32 | 10 / 2 | Module 22 theory, cases and tests |
| 33 | 10 / 2 | Module 23 theory, cases and tests |
| 34 | 12 / 2 | Module 24 sleep theory, cases and tests |
| 35 | 11 / 2 | Module 25 theory, cases and tests |
| 36 | 6 / 2 | Exam/media integration and QA |
| 37 | 57 / 2 | Combined staging candidate, including many module files |

Shared conflict-sensitive paths include content/course-foundation/index.ts, app/modules/[id]/[section]/page.tsx, app/resources/page.tsx and package.json. Preserve current main contents when reconciling these files.

PR #37 already includes many module-specific files from #26–#35, so these should be deduplicated against #37 before any individual import. PR #25 and #30 must be reviewed separately for their unique module-specific files. The compare summary alone does not prove full content integration or correctness.

No module content was deployed as a result of this inventory.
