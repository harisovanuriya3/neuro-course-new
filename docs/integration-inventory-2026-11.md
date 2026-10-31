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
